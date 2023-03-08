import axios from 'axios';


export var CONF = {
    origin_: 'https://api.azurewebsites.net',
    path_: '',
    debug_: false,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
}


export function DEBUG(...msgs) {
    if (CONF.debug_)
        console.dir(msgs, { depth: null })
}


export class TMD67Client {
    constructor(conf = CONF) {
        this.conf = conf;
        this.session = axios.create(this.conf)
    }

    _build_retrieve_path(instance) {
        let baseURL = CONF.path_.length > 0 ? `${CONF.origin_}/${CONF.baseURL}` : `${CONF.origin_}`;
        return `${baseURL}/${this.resource_name}/${instance.id}/`;
    }

    _build_resource_path() {
        let baseURL = CONF.path_.length > 0 ? `${CONF.origin_}/${CONF.baseURL}` : `${CONF.origin_}`;
        return `${baseURL}/${this.resource_name}/`;
    }

    async _get(url, conf = {}) {
        const _conf = Object.assign({ params: {} }, this.conf, conf)
        DEBUG(">>>>>>>>>>")
        DEBUG('GET:', url, _conf);
        return this.session.get(url, _conf).then((res => res.data))
            .catch(function (error) {
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)
                throw error;
            });
    }

    async _post(url, body, conf = {}) {
        const _conf = Object.assign({}, this.conf, conf)
        DEBUG(">>>>>>>>>>")
        DEBUG('POST:', url, body, _conf);
        return this.session.post(url, body, _conf).then((res => res.data))
            .catch(function (error) {
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)
                throw error;
            });
    }

    async _put(url, body, conf = {}) {
        const _conf = Object.assign({}, this.conf, conf)
        DEBUG(">>>>>>>>>>")
        DEBUG('PUT:', url, body, _conf);
        return this.session.put(url, body, _conf).then((res => res.data))
            .catch(function (error) {
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)
                throw error;
            });
    }

    async _patch(url, body, conf = {}) {
        const _conf = Object.assign({}, this.conf, conf)
        DEBUG(">>>>>>>>>>")
        DEBUG('PATCH:', url, body, _conf);
        return this.session.patch(url, body, _conf).then((res => res.data))
            .catch(function (error) {
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)
                throw error;
            });
    }

    async _delete(url, conf = {}) {
        const _conf = Object.assign({}, this.conf, conf)
        DEBUG(">>>>>>>>>>")
        DEBUG('DELETE:', url)
        return this.session.delete(url, _conf).then((res => res.data))
            .catch(function (error) {
                DEBUG("[Response.data]", error.response && error.response.data)
                DEBUG("[ERROR-message]", error.message)
                throw error;
            });
    }

    static to_pagenation(params = {}) {
        return {
            "page": params["page"],
        };
    }

    async list(conf = { params: {} }) {
        let url = this._build_resource_path();
        Object.assign(conf.params, TMD67Client.to_pagenation(conf.params))
        return this._get(url, conf);
    }

    async retrieve(instance, conf = {}) {
        let url = this._build_retrieve_path(instance)
        return this._get(url, instance, conf);
    }

    async create(body, conf = {}) {
        let url = this._build_resource_path();
        return this._post(url, body, conf);
    }

    async update(instance, conf = {}) {
        let url = this._build_retrieve_path(instance);
        return this._patch(url, instance, conf);
    }

    async delete(instance, conf = {}) {
        let url = this._build_retrieve_path(instance);
        return this._delete(url, instance, conf);
    }
}
