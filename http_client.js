import axios from 'axios';


export var CONF = {
    origin_: 'https://testtmd67api.azurewebsites.net',
    path_: '',
    debug_: false,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    timeout: 10000,
}


export function DEBUG(...msgs){
     if (CONF.debug_)
         console.dir(">>>>>>>>>>")
         console.dir(msgs, {depth:null})
         console.dir("<<<<<<<<<<")
}


function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}


function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}


export class TMD67Client{
    constructor(conf=CONF) {
        this.conf = conf;
        this.session = axios.create(this.conf)
    }

    _build_retrieve_path(instance){
        let baseURL = CONF.path_.length > 0 ? `${CONF.origin_}/${CONF.baseURL}`: `${CONF.origin_}`;
        return `${baseURL}/${this.resource_name}/${instance.id}/`;
    }

    _build_resource_path(){
        let baseURL = CONF.path_.length > 0 ? `${CONF.origin_}/${CONF.baseURL}`: `${CONF.origin_}`;
        return `${baseURL}/${this.resource_name}/`;
    }

    async _get(url, conf={}) {
        DEBUG('GET:', url, conf);
        return this.session.get(url, conf).then((res => res.data))
        .catch(function (error) {
            if (CONF.debug_){
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)            
            }
            throw error;
        });
    }

    async _post(url, body, conf={}) {
        DEBUG('POST:', url, body, conf);
        return this.session.post(url, body, conf).then((res => res.data))
        .catch(function (error) {
            if (CONF.debug_){
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)            }
            throw error;
        });
    }

    async _put(url, body, conf={}) {
        DEBUG('PUT:', url, body, conf);
        return this.session.put(url, body, conf).then((res => res.data))
        .catch(function (error) {
            if (CONF.debug_){
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)            }
            throw error;
        });
    }

    async _patch(url, body, conf={}) {
        DEBUG('PATCH:', url, body, conf);
        return this.session.patch(url, body, conf).then((res => res.data))
        .catch(function (error) {
            if (CONF.debug_){
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)            }
            throw error;
        });
    }

    async _delete(url, conf={}){
        DEBUG('DELETE:', url)
        return this.session.delete(url, conf).then((res => res.data))
        .catch(function (error) {
            if (CONF.debug_){
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)
            }
            throw error;
        });
    }

    static to_pagenation(input={}){
        return {
            "page": input["page_number"] || 1,
         };
    }

    async list(params, conf={}) {
        let url = this._build_resource_path(params);
        return this._get(url, RestClient.to_pagenation(params), Object.assign({}, this.conf, conf, { params: params }));
    }

    async create(body, conf={}){
        let url = this._build_resource_path(body);
        return this._post(url, body, Object.assign({}, this.conf, conf));
    }

    async retrieve(instance){
        let url = this._build_retrieve_path(instance)
        return this._get(url, instance, Object.assign({}, this.conf, conf));
    }

    async update(instance, conf={}){
        let url = this._build_retrieve_path(instance);
        return this._patch(url, instance, Object.assign({}, this.conf, conf));
    }

    async delete(instance, conf={}){
        let url = this._build_retrieve_path(instance);
        return this._delete(url, instance, Object.assign({}, this.conf, conf));
    }
}
