// compiler avec g++ -g -Wall -std=c++11 chaine.cpp -o chaine.exx -lpthread
// pour vérifier l'ordre, il faut ordonner les sorties par Doubichou (premier chiffre de chaque ligne) puis véricier que les thread sont dans l'ordre
// pour rassembler par doubichou utiliser
// ./chaine.exx 20 | sort -nsk 2
// le programme calcule le temps totale de travail on peut afficher le temps ecoulé via
// time ./chaine.exx 1000
// grâce à la chaine le temps écoulé doit être entre 5 et 6 fois inférieurs.



#include <thread>
#include <mutex>
#include <condition_variable>
#include <thread>
#include <vector>
#include <sys/time.h>
#include <unistd.h>
#include <iostream>

#define NB_ETAPES 6

const char* recette[NB_ETAPES] = {
  "mélange la farine et le cacao",
  "pétrie la pâte avec la margarine et l'huile",
  "ajoute le sucre et la cannelle",
  "ajoute un morceau de chocolat",
  "roule le doubitchou sous les aisselles",
  "cuit le doubitchou"
};


using namespace std;

class chaine {
private:
  unsigned nb_etapes;
  vector<int> nb_doubs; // Nombre de doubitchous disponibles en entrée de l'étape N
  mutex m;
  vector<condition_variable_any> t_cond;

public:
  chaine(int nb_etapes, int nb_doubichous);
  void affiche();
  void attend(int pos);
  void transmet(int pos);
  void termine();
};


chaine::chaine(int nb_etapes, int nb_doubichous) :
  nb_etapes(nb_etapes),
  nb_doubs (nb_etapes+1, 0),
  m(),
  t_cond(nb_etapes)
{
  nb_doubs[0] = nb_doubichous;
}

void
chaine::affiche() {
  for (unsigned i = 0; i < nb_etapes; ++i) {
    cout << "Doubitchous avant " << recette[i] << " : " << nb_doubs[i] << endl;
  }
  cout << "Doubitchous terminés : " << nb_doubs[nb_etapes] << endl;
}

void
chaine::attend(int pos) {
  m.lock();

  while(nb_doubs[pos]==0) {
    t_cond[pos].wait(m);
  }

  nb_doubs[pos]--;

  m.unlock();
}

void
chaine::transmet(int pos) {
  m.lock();

  nb_doubs[pos]++;
  t_cond[pos].notify_one();
  
  m.unlock();
}

void
chaine::termine() {
  // Pas besoin de mutex ici
  nb_doubs[nb_etapes]++;
}

double travail(int pos, int num_tours) {
  int res;  
  struct timeval av;
  struct timeval ap;
  if (pos > NB_ETAPES) {
    fprintf(stdout, "Le thread %d regarde les autres travailler\n", pos);
  } else {
    fprintf(stdout, "doub %d : le thread %d %s\n", num_tours, pos, recette[pos]);
  }
  res = gettimeofday(&av, NULL);
  if (res) {
    perror("gettimeofday"); exit(1);
  }
  usleep(1000*(rand()%20+1));
  res = gettimeofday(&ap, NULL);
  if (res) {
    perror("gettimeofday");
    exit(1);
  }
  fprintf(stdout, "doub %d : Le thread %d a fini\n", num_tours, pos);
  return (ap.tv_sec-av.tv_sec+(ap.tv_usec-av.tv_usec)/1000000.0);
}

double travail_chaine(chaine *c, int pos, int nb_tours, int nb_etape) {
  int i;
  double temps = 0;
  for (i=0; i<nb_tours; i++) {
    c->attend(pos);
    temps += travail(pos, i);
    if (pos != nb_etape-1) {
      c->transmet(pos+1);
    } else {
      c->termine();
      fprintf(stdout, "doub %d : le doubitchou est terminé\n", i);
    }
  }
  return temps;
}

void fct_thread(chaine *c, int pos, int nb_tours, int nb_etape, double *temps) {
  *temps = travail_chaine(c, pos, nb_tours, nb_etape);
}

int main(int argc, char* argv[]) {
  int i;
  int nb_threads = NB_ETAPES;
  int nb_tours = 10;

  if (argc >1) {
    if ((argc != 2)
	||((nb_tours = atoi(argv[1])) == 0)) {
      fprintf(stderr, "Usage %s <nb_doubichous>\n", argv[0]);
      exit(1);
    }

  }


  srand(time(NULL));
  

  fprintf(stdout, "%d threads\n", nb_threads);
  fprintf(stdout, "%d doubichous a faire\n", nb_tours);

  chaine c(NB_ETAPES, nb_tours);
 
  vector<thread> ths;
  double tab_temps[nb_threads];
  
  c.affiche();

  for (i=0; i<nb_threads; i++) {
    ths.push_back(thread(fct_thread, &c, i, nb_tours, NB_ETAPES, &tab_temps[i]));
  }

  c.affiche();

  for (i=0; i<nb_threads; i++) {
    ths[i].join();
  }

  c.affiche();

  double somme = 0;
  for (i=0; i<NB_ETAPES; i++) {
    somme += tab_temps[i];
  }
  cout << "Le temps total est de " << somme << " secondes"<< endl;

  return 0;
}