import React, {Component} from 'react'

export class ServiceForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            naam: null
        }
    }

    render() {
        return (
            <div className="serviceform">
                <h3>Voeg informatie toe aan deze service</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <label className="label" for="name">Naam:</label>
                    <input className="input-text" id="name" name="name" required="" type="text" />
                    <label className="label" for="description">Beschrijving:</label>
                    <input className="input-text" id="description" name="description" required="" type="text" />
                    <label className="label" for="producttype">Producttype:</label>
                    <input className="input-text" id="producttype" name="producttype" required="" type="text" />
                    <label className="label" for="email">Emailadres:</label>
                    <input className="input-text" id="email" name="email" required="" type="text" />
                    <label className="label" for="phone">Telefoonnummer:</label>
                    <input className="input-text" id="phone" name="phone" required="" type="number" />
                    <label className="label">Openingsuren:</label>
                    <div className="openinghours">
                        <div className="weekdays">
                            <p>Maandag van:</p>
                            <p>Dindsdag van:</p>
                            <p>Woensdag van:</p>
                            <p>Donderdag van:</p>
                            <p>Vrijdag van:</p>
                            <p>Zaterdag van:</p>
                            <p>Zondag van:</p>
                        </div>
                        <div className="hours">
                            <div className="day">
                                <input id="mo-start-am" name="mo-start-am" type="time" />
                                <p>tot </p>
                                <input id="mo-end-am" name="mo-end-am" type="time" />
                                <p>en van </p>
                                <input id="mo-start-pm" name="mo-start-pm" type="time" />
                                <p>tot </p>
                                <input id="mo-end-pm" name="mo-end-pm" type="time" />
                            </div>
                            <div className="day">
                                <input id="tu-start-am" name="tu-start-am" type="time" />
                                <p>tot </p>
                                <input id="tu-end-am" name="tu-end-am" type="time" />
                                <p>en van </p>
                                <input id="tu-start-pm" name="tu-start-pm" type="time" />
                                <p>tot </p>
                                <input id="tu-end-pm" name="tu-end-pm" type="time" />
                            </div>
                            <div className="day">
                                <input id="we-start-am" name="we-start-am" type="time" />
                                <p>tot </p>
                                <input id="we-end-am" name="we-end-am" type="time" />
                                <p>en van </p>
                                <input id="we-start-pm" name="we-start-pm" type="time" />
                                <p>tot </p>
                                <input id="we-end-pm" name="we-end-pm" type="time" />
                            </div>
                            <div className="day">
                                <input id="th-start-am" name="th-start-am" type="time" />
                                <p>tot </p>
                                <input id="th-end-am" name="th-end-am" type="time" />
                                <p>en van </p>
                                <input id="th-start-pm" name="th-start-pm" type="time" />
                                <p>tot </p>
                                <input id="th-end-pm" name="th-end-pm" type="time" />
                            </div>
                            <div className="day">
                                <input id="fr-start-am" name="fr-start-am" type="time" />
                                <p>tot </p>
                                <input id="fr-end-am" name="fr-end-am" type="time" />
                                <p>en van </p>
                                <input id="fr-start-pm" name="fr-start-pm" type="time" />
                                <p>tot </p>
                                <input id="fr-end-pm" name="fr-end-pm" type="time" />
                            </div>
                            <div className="day">
                                <input id="sa-start-am" name="sa-start-am" type="time" />
                                <p>tot </p>
                                <input id="sa-end-am" name="sa-end-am" type="time" />
                                <p>en van </p>
                                <input id="sa-start-pm" name="sa-start-pm" type="time" />
                                <p>tot </p>
                                <input id="sa-end-pm" name="sa-end-pm" type="time" />
                            </div>
                            <div className="day">
                                <input id="su-start-am" name="su-start-am" type="time" />
                                <p>tot </p>
                                <input id="su-end-am" name="su-end-am" type="time" />
                                <p>en van </p>
                                <input id="su-start-pm" name="su-start-pm" type="time" />
                                <p>tot </p>
                                <input id="su-end-pm" name="su-end-pm" type="time" />
                            </div>
                        </div>
                    </div>
                    <button className="btn">Voeg informatie toe</button>
                </form>
            </div>
        )
    }
}