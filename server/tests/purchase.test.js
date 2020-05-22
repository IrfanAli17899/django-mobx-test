const chai = require('chai');
const chaiHttp = require('chai-http');
const parallel = require('mocha.parallel');
const app = require('../app');
const mongoose = require('mongoose');

chai.use(chaiHttp);
let should = chai.should();
let assert = chai.assert;


describe('concurrency test on purchase', () => {

    var ticketId = '';
    let amount = 30
    before('connect', () => {
        return mongoose.createConnection(app.get("MONGOOSE_URI"), { useNewUrlParser: true });
    })
    it('will create a new ticket with 30 max purchases', (done) => {
        chai.request(app)
            .post('/tickets/add')
            .set('content-type', 'application/json')
            .send({ user: "5ec690370acc913314360835", hotel: "5ec690370acc91331436083a", name: "New Supper Offer test", maxPurchaseCount: amount })
            .end((err, res) => {
                res.should.have.status(200);
                assert(res.body.success === true, 'success is not true');
                ticketId = res.body.data._id;
                done();
            })
    })

    parallel('parallel requests of purchases', () => {
        it('first request of purchase with 30 tickets', (done) => {
            chai.request(app)
                .put('/purchase/' + ticketId)
                .set('content-type', 'application/json')
                .send({ amount })
                .end((err, res) => {
                    res.body.should.have.property('success', true);
                    res.should.have.status(200);
                    done();
                })
        })

        it('2nd request of purchase with 30 tickets', (done) => {
            chai.request(app)
                .put('/purchase/' + ticketId)
                .set('content-type', 'application/json')
                .send({ amount })
                .end((err, res) => {
                    res.body.should.have.property('success', false);
                    res.body.should.have.property('message', 'The required amount of tickets are unavailable');
                    res.should.have.status(400);
                    done();
                })
        })
    })


})