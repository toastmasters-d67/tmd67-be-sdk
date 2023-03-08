import { TMD67Client, CONF } from './http_client.js'


export class User extends TMD67Client {
    constructor() {
        super();
    }

    _buildBaseURL() {
        return CONF.path_.length > 0 ? `${CONF.origin_}/${CONF.path_}` : `${CONF.origin_}`;
    }

    async user_register(body) {
        const url = `${this._buildBaseURL()}/user-register/`;
        return this._post(url, body);
    }

    async user_login(body) {
        let url = null;
        /*
        The CSRF token is set by the backend server in a cookie when the user first visits the server.
        It's then sent back to the server on subsequent requests to verify that the request is legitimate.
        */
        url = `${this._buildBaseURL()}/csrf-token/`;
        const csrfToken = (await this._get(url)).csrftoken;

        // submit user credentials
        url = `${this._buildBaseURL()}/user-login/`
        return await this._post(url, body, Object.assign({ headers: { 'X-CSRFTOKEN': csrfToken } }, this.conf));
    }

    async user_directory(conf = {}) {
        let url = `${this._buildBaseURL()}/user-directory/`;
        return this._get(url, conf);
    }
}


export class UserService {

    _to_internal(input, extra = {}) {
        return input;
    }

    _to_represent(instance, extra = {}) {
        return instance;
    }

    async user_register(body, conf = CONF) {
        try {
            const instance = await new User().user_register(url, this._to_internal(payload));
            return this._to_represent(instance);
        } catch (error) {
            // UI show an error message to the user
            let error_msg = null;
            if (error.response && error.response.status === 400) {
                error_msg = {
                    error_code: "0400",
                    i18n: 'Email_Was_Existing',
                    status_code: error.response && error.response.status || undefined,
                }
            } else {
                error_msg = {
                    error_code: "0500",
                    i18n: 'Captured_Unexpected_Error',
                    status_code: error.response && error.response.status || undefined,
                }
            }
            return error_msg;
        }
    }

    async user_login(payload) {
        let url = null;
        try {
            await new User().user_login(this._to_internal(payload))
            const profile = await new User().user_directory();
            console.log('Login successful!');
            // UI redirect the user to the order's dashboard
            return profile
        } catch (error) {
            console.log(error)

            console.error('Login failed!');
            // UI show an error message to the user
            return {
                error_code: "0401",
                i18n: 'Incorrect_Email_Or_Password',
                status_code: error.response && error.response.status || undefined,
            }
        }
    }

    async user_directory() {
        try {
            const instance = await new User().user_directory()
            return this._to_represent(instance)
        } catch (error) {
            // UI show an error message to the user
            return {
                error_code: "0401",
                i18n: 'Cannot_Get_Anonymous_Profile',
                status_code: error.response && error.response.status || undefined,
            }
        }
    }
}
