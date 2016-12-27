"use strict";
import langcodes from './data';
var app = angular.module("ngLangcode", []); //jshint ignore:line

app.factory("ngLangcodeFactory", function() {
    var name_2_local, name_2_alpha1, name_2_alpha2, name_2_alpha2t, name_2_alpha2b, name_2_alpha3;
    var local_2_name, alpha1_2_name, alpha2_2_name, alpha2t_2_name, alpha2b_2_name, alpha3_2_name;
    [name_2_local, local_2_name] = _list_2_map_(langcodes, "name", "local");
    [name_2_alpha1, alpha1_2_name] = _list_2_map_(langcodes, "name", "1");
    [name_2_alpha2, alpha2_2_name] = _list_2_map_(langcodes, "name", "2");
    [name_2_alpha2t, alpha2t_2_name] = _list_2_map_(langcodes, "name", "2T");
    [name_2_alpha2b, alpha2b_2_name] = _list_2_map_(langcodes, "name", "2B");
    [name_2_alpha3, alpha3_2_name] = _list_2_map_(langcodes, "name", "3");

    var _name_list_ = [],
        _local_list_ = [],
        _alpha1_list_ = [],
        _alpha2_list_ = [],
        _alpha2T_list_ = [],
        _alpha2B_list_ = [],
        _alpha3_list_ = [];
    langcodes.map(function(lang) {
        _name_list_.push(lang.name);
        _local_list_.push(lang.local);
        _alpha1_list_.push(lang['1']);
        _alpha2_list_.push(lang['2']);
        _alpha2B_list_.push(lang['2B']);
        _alpha2T_list_.push(lang['2T']);
        _alpha3_list_.push(lang['3']);
    });

    function langExist(_name_) {
        return !!name_2_local[_name_];
    }

    return {
        langNames: _name_list_,
        langNativeNames: _local_list_,
        langAlpha1: _alpha1_list_,
        langAlpha2: _alpha2_list_,
        langAlpha2T: _alpha2T_list_,
        langAlpha2B: _alpha2B_list_,
        langAlpha3: _alpha3_list_,
        name_2_local: name_2_local,
        name_2_alpha1: name_2_alpha1,
        name_2_alpha2: name_2_alpha2,
        name_2_alpha2t: name_2_alpha2t,
        name_2_alpha2b: name_2_alpha2b,
        name_2_alpha3: name_2_alpha3,
        local_2_name: local_2_name,
        alpha1_2_name: alpha1_2_name,
        alpha2_2_name: alpha2_2_name,
        alpha2t_2_name: alpha2t_2_name,
        alpha2b_2_name: alpha2b_2_name,
        alpha3_2_name: alpha3_2_name,
        langExist: langExist
    };
}).filter("lang2code", ["ngLangcodeFactory", function(ngLangcodeFactory) {
    return function(input, input_type = "name", output_type = "alpha1") {
        var _lang_name_;
        switch (input_type) {
            case "local":
                _lang_name_ = ngLangcodeFactory.local_2_name[input];
                break;
            case "alpha1":
                _lang_name_ = ngLangcodeFactory.alpha1_2_name[input];
                break;
            case "alpha2":
                _lang_name_ = ngLangcodeFactory.alpha2_2_name[input];
                break;
            case "alpha2T":
                _lang_name_ = ngLangcodeFactory.alpha2t_2_name[input];
                break;
            case "alpha2B":
                _lang_name_ = ngLangcodeFactory.alpha2b_2_name[input];
                break;
            case "alpha3":
                _lang_name_ = ngLangcodeFactory.alpha3_2_name[input];
                break;
            default:
                _lang_name_ = (ngLangcodeFactory.langExist(input)) ? input : _lang_name_;
                break;
        }

        if (_lang_name_ === undefined) {
            console.warn(input + " doesn't exist in the list of language, return input");
            return input;
        }

        switch (output_type) {
            case "local":
                return ngLangcodeFactory.name_2_local[input];
            case "alpha1":
                return ngLangcodeFactory.name_2_alpha1[input];
            case "alpha2":
                return ngLangcodeFactory.name_2_alpha2[input];
            case "alpha2T":
                return ngLangcodeFactory.name_2_alpha2t[input];
            case "alpha2B":
                return ngLangcodeFactory.name_2_alpha2b[input];
            case "alpha3":
                return ngLangcodeFactory.name_2_alpha3[input];
            default:
                return _lang_name_;
        }
    };
}]);

function _list_2_map_(langList, key_name, value_name) {
    var _map_ = {};
    var _inverted_map_ = {};
    langList.map(function(lang) {
        _map_[lang[key_name]] = lang[value_name];
        _inverted_map_[lang[value_name]] = lang[key_name];
    });
    return [_map_, _inverted_map_];
}