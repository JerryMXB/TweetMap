const elasticsearch = require('elasticsearch');

class ElasticSearchLayer {
    constructor() {
        this.client = new elasticsearch.Client({
            host: 'localhost:9200'
        });
        this.id = 0;
    }

    addDocument(id, json, type, index) {
        return this.client.create({
            index: index,
            type : type,
            body: json,
            id: this.id++
        }).then((response)=>{
            console.log('Document added. id: ', id, this.id);
        }, (err)=>{
            console.log(err.message);
        });
    }

    addDocuments(jsons, type, index) {
        return this.client.bulk({
            index: index,
            type : type,
            body: json
        }).then((response)=>{
            console.log('Document added. id: ', id);
        }, (err)=>{
            console.log("error");
        });
    }

    searchAfterId(id, type, index, size) {
        return this.client.search({
            index: index,
            type: type,
            size: size,
            body: {
                'from': 0,
                '_source': 'tweet.*',
                'query': {
                    'range': {
                        'tweet.id': {
                            'gt': id
                        }
                    }
                },
                'sort': [{'tweet.id': 'asc'}]
            }
        });
    }

    getKNewest(k, type, index) {
        return this.getCount(index, type).then((res)=> {
            let startId = res.count > k ? res.count - k : 0;
            return this.searchAfterId(startId, type, index, k);
        });
    }

    getCount(index, type) {
        return this.client.count({
            index: index,
            type: type
        });
    }

    deleteIndex(index) {
        return this.client.indices.delete({
            index: index
        });
    }

    deleteIndexs() {
        return this.deleteIndex('*');
    }

}

module.exports = ElasticSearchLayer;

