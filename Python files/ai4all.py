from sklearn.naive_bayes import GaussianNB
from scipy import stats
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn import metrics 
import pandas as pd
import numpy as np

df = pd.read_csv('books.csv',engine='python')
x = df[['NumPages_stand','text_reviews_count','publication_year','eng']]

# Define the targets - what we are trying to predict or classify
# Here we are trying to predict the "average_rating" - at least as first since we'll start with linear regression
y = df[['average_rating']]
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.20)

# Set our machine learning algorithm type - Naive Bayes, Gaussian
NB = GaussianNB()

# Fit the model with our training data
NB.fit(x_train,y_train.values.ravel())

# Use the model to make predictions using our testing input data
y_pred_NB = NB.predict(x_test)

# Calculate the accuracy of the model as a percent
accuracy = metrics.accuracy_score(y_test, y_pred_NB)
accuracy_percentage = 100 * accuracy
print('Accuracy: ',accuracy_percentage)