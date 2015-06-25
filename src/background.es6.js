/**
 *
 */
class Background {


    constructor(args) {
        if (!args) { throw new Error("An options object is required"); }
        if (!args.dayAsset || !args.nightAsset) { throw new Error("The options object must include a 'dayAsset' and 'nightAsset'."); }

        this.dayAsset            = args.dayAsset;
        this.nightAsset          = args.nightAsset;
        this.backgroundElementId = this.buildBackgroundId(this.backgroundElementId);
        this.previousAsset       = null;
        this.backgroundCss       = ""
    }


    /**
     * @param {string} id - id of the element whos background will be changed.
     */
    buildBackgroundId(id) {
        if (!id) { 
            return "#background"; 
        }

        if (id.charAt(0) == "#") {
            return id;
        } else {
            return ("#" + id);
        }
    }


    /**
     * 
     */
    start() {
        setInterval(()=>{
            var asset = this.chooseAsset(this.getTimeInHours());

            if (asset != this.previousAsset) {
                this.changeBackground(asset);
                this.previousAsset = asset;
            }
        }, 200);
    }


    /**
     * @return - element object of the element whos background was updated
     */
    changeBackground(asset) {
        if (!asset) { throw new Error("An asset is required."); }
        var element = document.getElementById(this.backgroundElementId);

        element.style.background = "url(${asset})";

        return element;
    }


    /**
     * @return - current hour of the day (24 hour format)
     */
    getTimeInHours() {
        return new Date().getHours();
    }


    /**
     * Return what asset to use based on the given hour.
     *
     * @param {number} hour - current hour of the day (24 hour format)
     */
    chooseAsset(hour) {
        switch (true) {
            // Day: 6am - 7pm
            case ((hour >= 6) && (hour <= 19)):
                return this.dayAsset;
            break;
            // Night: 8pm - 5am
            case (((hour >= 20) && (hour <= 24)) || ((hour <= 5) && (hour >= 0))):
                return this.nightAsset;
            break;
            default:
                console.log("Error deciding what asset to use. Defaulting to dayAsset.");
                return this.dayAsset;
            break;
        }
    }



};

export default Background;