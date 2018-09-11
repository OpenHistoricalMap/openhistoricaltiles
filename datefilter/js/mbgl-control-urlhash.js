/*
 * URL hash control for MBGL
 * watch for the page's URL hash for #Z/LAT/LNG format, example:  #15/47.6073/-122.3327
 * move the map when the hash changes
 * update the hash when the map changes
 *
 * No params and no functions other than what's built in.
 * Example:
 *     MAP.addControl(new UrlHashControl());
 */

export class UrlHashControl {
    constructor (options={}) {
        // merge suppplied options with these defaults
        // not used, but leave in place so we can add them later as the ideas come in
        this.options = Object.assign({
        }, options);
    }

    onAdd (map) {
        this._map = map;

        // effectively on load: read existing hash and apply it
        if (window.location.hash) {
            this.applyUrlHashToMap(window.location.hash);
        }

        // start listening for changes to the hash, and to the map
        this._map2hash = () => { this.updateUrlHashFromMap(); };
        this._hash2map = () => { this.readUrlHashAndApply(); };
        window.addEventListener("hashchange", this._hash2map, false);
        this._map.on("moveend", this._map2hash);

        // return some dummy container we won't use
        this._container = document.createElement('span');
        return this._container;
    }

    onRemove () {
        // detach the event handlers
        window.removeEventListener("hashchange", this._hash2map);
        this._map.off("moveend", this._map2hash);

        // detach the map
        this._map = undefined;
    }

    readUrlHashAndApply () {
        const hashstring = window.location.hash;
        this.applyUrlHashToMap(hashstring);
    }

    applyUrlHashToMap (hashstring) {
        const params = hashstring.replace(/^#/, '').split('/');
        const [ z, x, y, d ] = [  ...params ];

        if (z.match(/^\d+\.?\d*$/) && x.match(/^\-?\d+\.\d+$/) && y.match(/^\-?\d+\.\d+$/)) {
            this._map.setZoom( parseFloat(z) );
            this._map.setCenter([ parseFloat(y), parseFloat(x) ]);
        }
        if (d.match(/^(\d\d\d\d\-\d\d\-\d\d),(\d\d\d\d\-\d\d\-\d\d)$/)) {
            const dates = d.split(',');
            this._map.DATESLIDER.setDates(dates[0], dates[1]);
        }
    }

    updateUrlHashFromMap () {
        const z = this._map.getZoom().toFixed(2);
        const lat = this._map.getCenter().lat.toFixed(5);
        const lng = this._map.getCenter().lng.toFixed(5);
        const dates = this._map.DATESLIDER.getDates().join(',');

        const hashstring = `${z}/${lat}/${lng}/${dates}/`;
        window.location.hash = hashstring;
    }
}
