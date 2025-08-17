import React, {useEffect} from 'react';
import {Chart} from "react-google-charts";
import server from "../komunikacija/server";

const GrafikSveta = () => {
    const countryNames = {
        "Srbija": "Serbia",
        "Hrvatska": "Croatia",
        "Bosna i Hercegovina": "Bosnia and Herzegovina",
        "Crna Gora": "Montenegro",
        "Severna Makedonija": "North Macedonia",
        "Slovenija": "Slovenia",
        "Slovačka": "Slovakia",
        "Češka": "Czech Republic",
        "Poljska": "Poland",
        "Mađarska": "Hungary",
        "Austrija": "Austria",
        "Nemačka": "Germany",
        "Holandija": "Netherlands",
        "Belgija": "Belgium",
        "Francuska": "France",
        "Španija": "Spain",
        "Portugal": "Portugal",
        "Italija": "Italy",
        "Švajcarska": "Switzerland",
        "Luksemburg": "Luxembourg",
        "Danska": "Denmark",
        "Norveška": "Norway",
        "Švedska": "Sweden",
        "Finska": "Finland",
        "Island": "Iceland",
        "Irska": "Ireland",
        "Velika Britanija": "United Kingdom",
        "Grčka": "Greece",
        "Turska": "Turkey"
    }

    const mapCountryNames = (country) => {
        return countryNames[country] || country; // If the country is not in the map, return it as is
    }

    const [podaciGrafiksa, setPodaciGrafiksa] = React.useState([]);

    useEffect(() => {
        server.get('/grafik').then(
            response => {
                console.log(response.data);
                const data = response.data.podaci.map(item => [
                    mapCountryNames(item.nazivDrzave), // Map the country name
                    item.brojPutovanja
                ]);
                setPodaciGrafiksa([["Drzava", "Broj putovanja"], ...data]);
            }
        )
    }, []);
    return (
        <div>
            <Chart
                chartType="GeoChart"
                width="100%"
                height="100%"
                data={podaciGrafiksa}
                options={{
                    region: "150",
                }}
            />
        </div>
    );
};

export default GrafikSveta;
