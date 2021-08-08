from flask import Flask, request, make_response, jsonify
import random

import pickle
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem.snowball import SnowballStemmer

# Initialize the app
app = Flask(__name__)

# Load the list of filler words and the word stemmer
stopWords = set(stopwords.words('english'))
wordStemmer = SnowballStemmer(language='english')

# Load the classifier model
f = open('classifier.pickle', 'rb')
classifier = pickle.load(f)
f.close()

def stringToDict(inputStr):
  # Format the input string in such a way that the classifier can understand it.
  # Specifically, the input string must be converted into a dictionary where
  # the keys are the (slightly modified) words in the string and the values are 0.
  answer = {}
  # Split the inputStr into a list
  splitString = word_tokenize(inputStr)
  for word in splitString:
    # Remove punctuation and filler words
    if len(word) == 1 and word.isalpha() == False and word.isdigit() == False:
      continue
    if not word in stopWords:
      # Add the stem of the word to the dictionary (attempting to remove
      # prefixes and suffixes) as a key, with value 0
      answer[wordStemmer.stem(word)] = 0
  return answer

@app.route('/', methods=['GET', 'POST'])
def checker():
  if request.method == 'POST':
    # Get the JS data and print it for debugging, to verify it got through correctly
    checkString = request.form['inputString']
    print("Got this from JS: " + checkString)

    # Use the classifier on the input string
    result = (classifier.classify(stringToDict(str(checkString))) == 1)
    # A return value of 1 here means that the string is offensive, and a
    # return value of 0 means it isn't (both according to the algorithm).
    
    # Verify the return value on the Python side (for debugging)
    print("Python return val is " + str(result))
    # Create and return the response object, making sure to allow the
    # requesting service to access it properly (CORS)
    resp = make_response(jsonify(response=result), 200)
    resp.headers['Access-Control-Allow-Origin'] = "http://localhost:4830"
    return resp
  else:
    return make_response(jsonify('Welcome to my webapp :)'), 200)

if __name__ == "__main__":
  app.run(debug = True)