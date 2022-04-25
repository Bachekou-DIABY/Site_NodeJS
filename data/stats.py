#!/usr/bin/env python
# coding: utf-8

# In[69]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
get_ipython().run_line_magic('matplotlib', 'inline')
plt.style.use('ggplot')


# In[70]:


df = pd.read_csv("global_power_plant_database.csv" , low_memory=False)
dfj= pd.read_json("out.json")


# In[71]:


dfj


# In[72]:


dfj.groupby(['Filieres']).sum().plot(kind='pie', y='Pourcentage',figsize=(10,10))


# In[73]:


df


# In[74]:


df_nuclear


# In[103]:


n = 20
top20 = df_nuclear['country_long'].value_counts()[:n].index.tolist()
top20.reverse()


# In[104]:


df_top20 = df[df['country_long'].isin(top20)]
df_top20


# In[105]:


df_top_20_nuclear = df_top20[(df_top20.primary_fuel == 'Nuclear')]
df_top_20_nuclear


# In[106]:


print(df_top_20_nuclear['primary_fuel'].value_counts()['Nuclear'])


# In[128]:


nb = df_top_20_nuclear['country_long'].value_counts()
nb.sort_values(ascending=True).plot.barh(figsize=(15,15),title='Number of power plants with nuclear as primary fuel')


# In[132]:


import plotly.express as px
dn= px.data.nb


# In[133]:


print(df.nunique())


# In[ ]:




