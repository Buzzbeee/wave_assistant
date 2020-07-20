import * as functions from 'firebase-functions';
import {getHighestWave, getChart, getHighestWaveEachDay, getWavesOverThreeFeet, getInitialResponse, getTodayWave} from './format_data';
import {dialogflow, SimpleResponse, Image, BasicCard} from 'actions-on-google';

const app = dialogflow({ debug: true });

app.intent('how are the waves', async (conv) => {
    
    const response: string = await getInitialResponse();
    const chart: string = await getChart();
    
    conv.ask(new SimpleResponse({
        text: response,
        speech: response
    }))

    conv.ask(new BasicCard({
        image: new Image({
            url: chart,
            alt: 'BuzzardsView.com'
        })
    }))
});

app.intent('waves each day', async (conv) => {
    const waves = await getHighestWaveEachDay();

    conv.close(new SimpleResponse({
        text: waves,
        speech: waves
    }));

});

app.intent('best waves', async (conv) => {
    const waves = await getWavesOverThreeFeet();

    conv.close(new SimpleResponse({
        text: waves,
        speech: waves
    }));

});

app.intent('best wave', async (conv
    ) => {
    const waves = await getHighestWave();

    conv.close(new SimpleResponse({
        text: waves,
        speech: waves
    }));

});

app.intent('waves today', async (conv
    ) => {
    const waves = await getTodayWave();

    conv.close(new SimpleResponse({
        text: waves,
        speech: waves
    }));

});

export const fulfillment = functions.https.onRequest(app);