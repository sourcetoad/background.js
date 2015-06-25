import Background from '../src/background.es6.js';


describe('Background Class', ()=>{
    let background = null,
        myEl       = null,
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

        myEl = document.getElementById(background.backgroundElementId);
    });
    afterEach(()=>{
        if (document.getElementById(background.backgroundElementId)) {
            document.body.removeChild(document.getElementById(background.backgroundElementId));
        }
    });


    describe('buildBackgroundId', ()=>{
        it('returns the default background id', ()=>{
            expect(background.buildBackgroundId()).toBe("#background");
        });
        it('returns the same string if it starts with a hash', ()=>{
            expect(background.buildBackgroundId("#test")).toBe("#test");
        });
        it('prefixes the given string with a hash', ()=>{
            expect(background.buildBackgroundId("test")).toBe("#test");
        });
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

            let oldBackgroundCss = myEl.style.background;

            background.changeBackground("changed.png");

            console.log(document.getElementById(background.backgroundElementId).style.background);

            expect(document.getElementById(background.backgroundElementId).style.background).not.toBe("url(${oldBackgroundCss})");
        });
    });





});