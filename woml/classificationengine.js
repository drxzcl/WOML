// Put everything in this object for global abatement.
var CE = {
    stemmer:new Snowball('Dutch'),
    featurize:function(html) {
        f = {};

        html.split(/[^a-zA-Z0-9_]+/g).map(function(item){
            CE.stemmer.setCurrent(item);
            CE.stemmer.stem();
            f[CE.stemmer.getCurrent()] = 1;
        });
        features = [];
        for (item in f) {
            features.push(item);
        }
        return features;
    },
    classify:function(features, classifier) {
        var results = {};
        for (label in classifier.labels) {
            var p = classifier.labels[label]; // A-priori probability
            features.map(function(feature){
                var prob = classifier.features[label+"||"+feature];
                if (prob) {
                    p = p + prob;
                }
            });
            results[label] =  p;
        }
        var max = -100000, maxlabel="";
        for (label in results) {
            if (results[label] > max) {
                max = results[label];
                maxlabel = label;
            }
        }
        return maxlabel;
    }
}