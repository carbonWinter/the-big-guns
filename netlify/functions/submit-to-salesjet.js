const axios = require("axios");

exports.handler = async function (event, context) {
    try {
        if (event.httpMethod !== "POST") {
            throw new Error("HTTP Method not supported");
        }
        if (event.httpMethod !== "POST") {
            throw new Error("HTTP Method not supported");
        }
        const requestBody = JSON.parse(event.body);
        const { selectedService, appointmentDate, appointmentTime, name, email, phone, isOkToReceiveOffer } = requestBody;

        const response = await axios({
            url: "https://sj-api.com/externalapp/track",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.SALESJET_API_KEY
            },
            data: {
                event_name: "appointment_form",
                contact: {
                    first_name: name,
                    email: email,
                    phone_number: phone,
                    custom_attributes: {
                        "5907c248-a7e5-ec11-a9ab-ff1d79b08822": selectedService,
                        "5a07c248-a7e5-ec11-a9ab-ff1d79b08822": appointmentDate,
                        "7ac88353-a7e5-ec11-a9ab-ff1d79b08822": appointmentTime,
                        "c603df5d-a7e5-ec11-a9ab-ff1d79b08822": isOkToReceiveOffer
                    }
                }
            }
        });

        //console.log(response.data);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Lead successfully created" }),
            headers: {
                'Access-Control-Allow-Origin': 'same-origin',
                'Access-Control-Allow-Headers': 'Origin'
            }
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: err.message }),
        }
    }

}