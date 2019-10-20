import axios from 'axios'
import {appOptions} from "../model/Variables";

export default class ContentService {

    getCarsSmall() {
        return axios.get('assets/layout/data/cars-small.json').then(res => res.data.data);
    }

    getCarsMedium() {
        return axios.get('assets/layout/data/cars-medium.json').then(res => res.data.data);
    }

    getCarsLarge() {
        return axios.get('assets/layout/data/cars-large.json').then(res => res.data.data);
    }

    getModel() {
        return axios.get(appOptions.apiUrl + 'content/get/model').then(res => res.data);
    }
}
