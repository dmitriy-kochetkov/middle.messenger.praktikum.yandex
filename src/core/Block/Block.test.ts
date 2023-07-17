import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import { EVENTS } from '../constants';
import type BlockType from './Block';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
};

const { default: Block } = proxyquire('./Block', {
    '../EventBus': {
        EventBus: class {
            emit = eventBusMock.emit;

            on = eventBusMock.on;
        }
    }
}) as { default: typeof BlockType };

class BlockMock extends Block<{}> {}

describe('Block', () => {
    let blockMock: BlockMock;
    const initProps = { test: 'test prop' };
    const newProps = { test: 'new prop' };

    beforeEach(() => {
        blockMock = new BlockMock(initProps);
    });

    describe('Инициализация', () => {
        it('Должен зарегистрировать INIT событие', () => {
            expect(eventBusMock.on.calledWith(EVENTS.INIT)).to.eq(true);
        });

        it('Должен зарегистрировать RENDER событие', () => {
            expect(eventBusMock.on.calledWith(EVENTS.FLOW_RENDER)).to.eq(true);
        });

        it('Должен зарегистрировать COMPONENT-DID-MOUNT событие', () => {
            expect(eventBusMock.on.calledWith(EVENTS.FLOW_CDM)).to.eq(true);
        });

        it('Должен зарегистрировать COMPONENT-DID-UPDATE событие', () => {
            expect(eventBusMock.on.calledWith(EVENTS.FLOW_CDU)).to.eq(true);
        });

        it('Должен зарегистрировать COMPONENT-WILL-UNMOUNT событие', () => {
            expect(eventBusMock.on.calledWith(EVENTS.FLOW_CWU)).to.eq(true);
        });

        it('Должен диспатчить INIT событие', () => {
            expect(eventBusMock.emit.calledWith(EVENTS.INIT)).to.eq(true);
        });

        it('Должен установить переданные в констуктор props', () => {
            expect((blockMock as any).props).to.eql(initProps);
        });
    });

    describe('Метод setProps()', () => {
        it('Должен изменить props', () => {
            blockMock.setProps(newProps);
            expect((blockMock as any).props).to.eql(newProps);
        });

        it('Должен диспатчить COMPONENT-DID-UPDATE', () => {
            blockMock.setProps(newProps);
            expect(eventBusMock.emit.calledWith(EVENTS.FLOW_CDU)).to.eq(true);
        });
    });
});
