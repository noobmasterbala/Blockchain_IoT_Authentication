/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
/**
* Secure Hash Algorithm (SHA256)
* http://www.webtoolkit.info/
* Original code by Angel Marin, Paul Johnston
**/

function SHA256(s){
    var chrsz = 8;
    var hexcase = 0;
   
    function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
    }
   
    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
   
    function core_sha256 (m, l) {
    var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
    var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
   
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;
   
    for ( var i = 0; i<m.length; i+=16 ) {
    a = HASH[0];
    b = HASH[1];
    c = HASH[2];
    d = HASH[3];
    e = HASH[4];
    f = HASH[5];
    g = HASH[6];
    h = HASH[7];
   
    for ( var j = 0; j<64; j++) {
    if (j < 16) W[j] = m[j + i];
    else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
   
    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
    T2 = safe_add(Sigma0256(a), Maj(a, b, c));
   
    h = g;
    g = f;
    f = e;
    e = safe_add(d, T1);
    d = c;
    c = b;
    b = a;
    a = safe_add(T1, T2);
    }
   
    HASH[0] = safe_add(a, HASH[0]);
    HASH[1] = safe_add(b, HASH[1]);
    HASH[2] = safe_add(c, HASH[2]);
    HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]);
    HASH[5] = safe_add(f, HASH[5]);
    HASH[6] = safe_add(g, HASH[6]);
    HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
    }
   
    function str2binb (str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    }
    return bin;
    }
   
    function Utf8Encode(string) {
    string = string.replace(/\r\n/g,'\n');
    var utftext = '';
   
    for (var n = 0; n < string.length; n++) {
   
    var c = string.charCodeAt(n);
   
    if (c < 128) {
    utftext += String.fromCharCode(c);
    }
    else if((c > 127) && (c < 2048)) {
    utftext += String.fromCharCode((c >> 6) | 192);
    utftext += String.fromCharCode((c & 63) | 128);
    }
    else {
    utftext += String.fromCharCode((c >> 12) | 224);
    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    utftext += String.fromCharCode((c & 63) | 128);
    }
   
    }
   
    return utftext;
    }
   
    function binb2hex (binarray) {
    var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
    var str = '';
    for(var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8+4)) & 0xF) +
    hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8 )) & 0xF);
    }
    return str;
    }
   
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
   }
// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        let resval = ctx.clientIdentity.getMSPID(); 
    if(resval==="Org1MSP"){
        const assets = [
            {
                ID: '17',
                X_1: '6493719', 
                X_2: '9361',
                X_3: '364827491',
		        coord_X: '825',
                coord_Y: '104',
		        mode:'inactive',
                Conc: SHA256("011"),
            },
            {
                ID: '84',
                X_1: '3312',
                X_2: '7554312',
                X_3: '22132',
		        coord_X: '312',
                coord_Y: '201',
		        mode:'inactive',
                Conc: SHA256("111"),
            },
          
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }
    else{
        console.log("Access Denied: Unauthorized Access");
        return "Access Denied: Unauthorized Access";
    }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, x1,x2 ,x3,y1,y2,y3,cx,cy) {
        let resval = ctx.clientIdentity.getMSPID();
        if(resval==="Org1MSP"){
        
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The dumb sensor ${id} already has been deployed`);
        }

        const asset = {
            ID: id,
                X_1: x1,
                X_2: x2,
                X_3: x3,
		        coord_X: cx,
                coord_Y: cy,
		        mode:'inactive',
                Conc: SHA256((y1.concat(y2)).concat(y3)),
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);}
        else{
            console.log("Access Denied: Unauthorized Access");
            return "Access Denied: Unauthorized Access";
        }
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        let resval = ctx.clientIdentity.getMSPID();
        if(resval==="Org1MSP"){
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The dumb sensor ${id} has not been deployed`);
        }
        return assetJSON.toString();
        }
        else{
            console.log("Access Denied: Unauthorized Access");
            return "Access Denied: Unauthorized Access";
        }
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async ActivateState(ctx, id) {
        let resval = ctx.clientIdentity.getMSPID();
        if(resval==="Org1MSP"){
            const exists = await this.AssetExists(ctx, id);
            if (!exists) {
                throw new Error(`The dumb sensor ${id} has not been deployed`);
            }
            var a = await ctx.stub.getState(id);
            var b = JSON.parse(a);
            b.mode = "active";
            return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(b))));
    }
    else{
        console.log("Access Denied: Unauthorized Access");
        return "Access Denied: Unauthorized Access";
    }
}

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        let resval = ctx.clientIdentity.getMSPID();
        if(resval==="Org1MSP"){
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }
    else{
        console.log("Access Denied: Unauthorized Access");
        return "Access Denied: Unauthorized Access";
    }
}

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }
    async AssetLocate(ctx, id){
        let resval = ctx.clientIdentity.getMSPID();
        if(resval==="Org1MSP"){
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The dumb sensor ${id} has not been deployed`);
        }
        var a = await ctx.stub.getState(id);
        var b = JSON.parse(a);
        const assets = {
            ID: id,
                X_1: b.X_1,
                X_2: b.X_2,
                X_3: b.X_3,
        };
        console.log(assets);
        return JSON.stringify(assets);
    }
    else{
        console.log("Access Denied: Unauthorized Access");
        return "Access Denied: Unauthorized Access";
    }
    }
    async AssetReturn(ctx, id){
        let resval = ctx.clientIdentity.getMSPID();
    if(resval==="Org1MSP"){
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The dumb sensor ${id} does not exist`);
        }
        var a = await ctx.stub.getState(id);
        var b = JSON.parse(a);
        const assets = {
            ID: id,
            Conc: b.Conc,
        };
        return JSON.stringify(assets);
    }
        else{
            console.log("Access Denied: Unauthorized Access");
            return "Access Denied: Unauthorized Access";
        }
    }
    async AssetCheck(ctx, id,y1,y2,y3){
        let resval = ctx.clientIdentity.getMSPID();
    if(resval==="Org1MSP"){
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The dumb sensor ${id} does not exist`);
        }
        var a = await ctx.stub.getState(id);
        var b = JSON.parse(a);
        var checker = SHA256((y1.concat(y2)).concat(y3));
        if(b.Conc ==checker){
                console.log("Verified Dumb Sensor");
                return "1";
        }
        else{
            console.log("UNVERIFIED DS");
            return "0";
        }
       
    }
        else{
            console.log("Access Denied: Unauthorized Access");
            return "Access Denied: Unauthorized Access";
        }
    }
    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        let resval = ctx.clientIdentity.getMSPID();
    if(resval==="Org1MSP"){
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
else{
    console.log("Access Denied: Unauthorized Access");
    return "Access Denied: Unauthorized Access";
}
}
}

module.exports = AssetTransfer;
