import axios from "axios";

class Service {

    async weatherIcon(code) {
            return await axios.get(`https://openweathermap.org/img/wn/${code}@2x.png`).then(({data}) => data);
    }

    async weather(latitude, longitude) {
        return await axios.get(`${process.env.VUE_APP_OPEN_WEATHER_API_URL}/data/2.5/weather`, {
            params: {
                lat: latitude,
                lon: longitude,
                units: 'metric',
                lang: 'pt_br',
                appid: process.env.VUE_APP_OPEN_WEATHER_API_KEY
            }
        }).then(({data}) => data);
    }

    async geocoding(data = {}, type = 'direct') {
        return await axios.get(`${process.env.VUE_APP_OPEN_WEATHER_API_URL}/geo/1.0/${type}`, {
            params: {
                ...{limit: 10, lang: 'pt_br', appid: process.env.VUE_APP_OPEN_WEATHER_API_KEY},
                ...data,
            }
        });
    }

    async coordinates(params, type = 'direct') {
        return await this.geocoding(params, type)
            .then(({data}) => data.map(value => ({
                title: value.state ? `${value.name} - ${value.state}` : value.name,
                value: {
                    title: value.state ? `${value.name} - ${value.state}` : value.name,
                    lat: value.lat,
                    lon: value.lon
                }
            })));
    }
}

export default new Service();