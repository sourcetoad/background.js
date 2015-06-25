import Background from '../src/background.es6.js';


describe('Background Class', ()=>{
    jasmine.clock().install();

    let background = null,
        myEl       = null,
        changeSpy  = null,
        clearSpy   = null,
        setSpy     = null,
        dayAsset   = "../day.png",
        nightAsset = "../night.png";


    describe('constructor', ()=>{
        it('requires an options object', ()=>{
            expect(()=>{ new Background(); }).toThrowError();
        });
    });


    beforeEach(()=>{
        background = new Background({
            dayAsset:   dayAsset,
            nightAsset: nightAsset
        });

        document.body.insertAdjacentHTML(
            'afterbegin', 
            "<div id='background'></div>"
        );

        myEl      = document.getElementById(background.backgroundElementId);
        changeSpy = jasmine.createSpy("background.changeBackground");
        clearSpy  = jasmine.createSpy("window.clearInterval");
        setSpy    = jasmine.createSpy("window.setInterval");
    });
    afterEach(()=>{
        if (document.getElementById(background.backgroundElementId)) {
            document.body.removeChild(document.getElementById(background.backgroundElementId));
        }
    });

    describe('getTimeInHours', ()=>{
        it('should return a number between 0 and 24', ()=>{
            expect(background.getTimeInHours()).toBeGreaterThan(0);
            expect(background.getTimeInHours()).toBeLessThan(24);
        });
    });

    describe('chooseAsset', ()=>{
        it('should return the day asset from 6am to 7pm', ()=>{
            for (let i = 19; i < 7; i--) {
                expect(background.chooseAsset(i)).toBe(dayAsset);
            }
        });
        it('should return the night asset from 8pm to 12am', ()=>{
            for (let i = 24; i <= 21; i--) {
                expect(background.chooseAsset(i)).toBe(nightAsset);
            }
        });
        it('should return the night asset from 12am to 5am', ()=>{
            for (let i = 5; i <= 0; i--) {
                expect(background.chooseAsset(i)).toBe(nightAsset);
            }
        });
        it('should return the night asset if the given hour is not between 0 and 24', ()=>{
            expect(background.chooseAsset(50)).toBe(dayAsset);
        });
    });

    describe('changeBackground', ()=>{
        it("the background element is in the DOM", function () {
            expect(myEl).not.toBeNull();
        });
     
        it("the background element is a child of the body", function () {
            expect(myEl.parentElement).toBe(document.body);
        });
        it('should update the background element CSS', ()=>{
            myEl.style.background = "changeMe.png";

            background.changeBackground("changed.png");

            expect(document.getElementById(background.backgroundElementId).style.background).not.toBe("url(changeMe.png)");
        });
    });

    describe('start', ()=>{
        it('should call changeBackground', ()=>{
            background.start();

            setTimeout(()=>{
                expect(changeSpy).toHaveBeenCalled();
            }, 200);
        });
        it('should update background.previousAsset', ()=>{
            background.previousAsset = "fakeOldAsset";
            background.start();

            setTimeout(()=>{
                expect(background.previousAsset).not.toBe("fakeOldAsset");
                background.stop();
            }, 200);
        });
    });

});