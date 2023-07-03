import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { HttpTransport } from './HttpTransport';
import { expect } from 'chai';

describe('HttpTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HttpTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = xhr;

        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
        requests.push(request);
        });

        instance = new HttpTransport('/auth');
    });

    afterEach(() => {
        requests.length = 0;
    })

    it('метод get() должен отправлять GET запрос', () => {
        instance.get('/user');

        const [request] = requests;

        expect(request.method).to.eq('GET');
    });

    it('метод post() должен отправлять POST запрос', () => {
        instance.post('/user');

        const [request] = requests;

        expect(request.method).to.eq('POST');
    });

    it('метод put() должен отправлять PUT запрос', () => {
        instance.put('/user');

        const [request] = requests;

        expect(request.method).to.eq('PUT');
    });

    it('метод delete() должен отправлять DELETE запрос', () => {
        instance.delete('/user');

        const [request] = requests;

        expect(request.method).to.eq('DELETE');
    });

    it('при формировании запроса должен устанавливать переданные в параметрах заголовки', () => {
        const testHeaders = {
            headerName: 'headerValue',
        };

        instance.get('/user', { headers: testHeaders});

        const [request] = requests;

        expect(request.requestHeaders.headerName).to.eq(testHeaders.headerName);
    });

    it('Отправялемые запросы должны содержать параметр withCredentials = true', () => {
        instance.post('/user');

        const [request] = requests;

        expect(request.withCredentials).to.eq(true);
    });
});
