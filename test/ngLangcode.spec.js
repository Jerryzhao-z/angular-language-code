"use strict";

describe("ngLangcodeFactory test", function() {
    beforeEach(module("ngLangcode"));
    var ngLangcodeFactory;
    beforeEach(inject(function(_ngLangcodeFactory_) { //jshint ignore:line
        ngLangcodeFactory = _ngLangcodeFactory_;
    }));

    it("langNames list", function() {
        expect(ngLangcodeFactory.langNames()).not.toBeUndefined();
        expect(ngLangcodeFactory.langNames()).not.toBeNull();
        expect(ngLangcodeFactory.langNames().length).not.toEqual(0);
        expect(ngLangcodeFactory.langNames().length).toEqual(184);
    });

    it("NativeNames list", function() {
        expect(ngLangcodeFactory.langLocalNames()).not.toBeUndefined();
        expect(ngLangcodeFactory.langLocalNames()).not.toBeNull();
        expect(ngLangcodeFactory.langLocalNames().length).not.toEqual(0);
        expect(ngLangcodeFactory.langLocalNames().length).toEqual(184);

    });

    it("alpha1 list", function() {
        expect(ngLangcodeFactory.langAlpha1()).not.toBeUndefined();
        expect(ngLangcodeFactory.langAlpha1()).not.toBeNull();
        expect(ngLangcodeFactory.langAlpha1().length).not.toEqual(0);
        expect(ngLangcodeFactory.langAlpha1().length).toEqual(184);

    });

    it("alpha2 list", function() {
        expect(ngLangcodeFactory.langAlpha2()).not.toBeUndefined();
        expect(ngLangcodeFactory.langAlpha2()).not.toBeNull();
        expect(ngLangcodeFactory.langAlpha2().length).not.toEqual(0);
        expect(ngLangcodeFactory.langAlpha2().length).toEqual(184);
    });

    it("alpha2T list", function() {
        expect(ngLangcodeFactory.langAlpha2T()).not.toBeUndefined();
        expect(ngLangcodeFactory.langAlpha2T()).not.toBeNull();
        expect(ngLangcodeFactory.langAlpha2T().length).not.toEqual(0);
        expect(ngLangcodeFactory.langAlpha2T().length).toEqual(184);

    });

    it("alpha2B list", function() {
        expect(ngLangcodeFactory.langAlpha2B()).not.toBeUndefined();
        expect(ngLangcodeFactory.langAlpha2B()).not.toBeNull();
        expect(ngLangcodeFactory.langAlpha2B().length).not.toEqual(0);
        expect(ngLangcodeFactory.langAlpha2B().length).toEqual(184);
    });

    it("alpha3 list", function() {
        expect(ngLangcodeFactory.langAlpha3()).not.toBeUndefined();
        expect(ngLangcodeFactory.langAlpha3()).not.toBeNull();
        expect(ngLangcodeFactory.langAlpha3().length).not.toEqual(0);
        expect(ngLangcodeFactory.langAlpha3().length).toEqual(184);
    });
});

describe("lang2code filter test", function() {
    beforeEach(module("ngLangcode"));
    var $filter;
    beforeEach(inject(function(_$filter_) { //jshint ignore:line
        $filter = _$filter_;
    }));

    it('filter with name "Chinese"', function() {
        var sample = {
            "name": "Chinese",
            "local": "中文",
            "1": "zh",
            "2": "zho",
            "2T": "zho",
            "2B": "chi",
            "3": "zho"
        };
        expect($filter('lang2code')(sample.name)).toEqual(sample['1']);
        expect($filter('lang2code')(sample.name, "name", "local")).toEqual(sample.local);
        expect($filter('lang2code')(sample.name, "name", "alpha2")).toEqual(sample['2']);
        expect($filter('lang2code')(sample.name, "name", "alpha3")).toEqual(sample['3']);
        expect($filter('lang2code')(sample.name, "name", "alpha2T")).toEqual(sample['2T']);
        expect($filter('lang2code')(sample.name, "name", "alpha2B")).toEqual(sample['2B']);
        expect($filter('lang2code')("you don't know")).toEqual("you don't know");
    });

    it('filter with code of Frenche', function() {
        var sample = {
            "name": "French",
            "local": "français",
            "1": "fr",
            "2": "fra",
            "2T": "fra",
            "2B": "fre",
            "3": "fra"
        };
        expect($filter('lang2code')(sample['1'], "alpha1", "name")).toEqual(sample.name);
        expect($filter('lang2code')(sample.local, "local", "name")).toEqual(sample.name);
        expect($filter('lang2code')(sample['2'], "alpha2", "name")).toEqual(sample.name);
        expect($filter('lang2code')(sample['3'], "alpha3", "name")).toEqual(sample.name);
        expect($filter('lang2code')(sample['2T'], "alpha2T", "name")).toEqual(sample.name);
        expect($filter('lang2code')(sample['2B'], "alpha2B", "name")).toEqual(sample.name);
    });
});