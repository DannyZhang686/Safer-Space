from flask import Flask, jsonify, request, render_template
import pickle
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem.snowball import SnowballStemmer

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

def check(inputStr):
  # This function checks whether the given string should be censored
  if classifier.classify(stringToDict(str(inputStr))) == 1:
    # A return value of 1 in the classification function means that
    # the string is offensive, and a return value of 0 means that
    # it is not offensive according to the classifier.
    return True
  return False

@app.route('/check', methods=['GET', 'POST'])
def requestHandler():
  # GET request
  if request.method == 'GET':
    content = request.get_json()
    returnVal = {'response': check(content['text'])}
    return jsonify(returnVal)  # Use JSON
  # POST request
  if request.method == 'POST':
    print(request.get_json())  # Parse as JSON
    return 'Success', 200

#########  Run the app  #########

app = Flask(__name__)
app.run(debug=True)