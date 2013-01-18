import pickle
import json
import math

classifier = pickle.load(open("AZDescriptionsHtmlbinaryBayes.pickle"))

c = {}
labels = {}

# Store everything as log-probability to make the most of our
# significant digits

for k in classifier._label_probdist._freqdist:
    labels[k] = math.log(classifier._label_probdist.prob(k))

features = {}
for k,v in classifier._feature_probdist.iteritems():
    myk = "%s||%s" % (k[0],k[1][:-1])
    myv = math.log(v.prob(True))
    features[myk]=myv

c = {"labels":labels,"features":features}
cj = json.dumps(c)

print >>open("classifier.js","w"), "var classifier = %s" % cj


print "Done"