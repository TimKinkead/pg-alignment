"use strict";

function stripHtml(a) {
    return a = a.replace(/<[^>]*>/g, " "), a = a.replace(/&#xA0;/g, " "), a = a.replace(/[\s]{2,10}/g, " ");
}

function parseModule(a, b) {
    if (!a.ldcDbData) return {};
    var c, d, e, f, g = [], h = a.ldcDbData.body || {}, i = h.curriculum || {}, j = i.discipline || {}, k = h.teaching_task || {}, l = k.substitutions || [], m = k.template || {}, n = k.demands || [], o = h.skills_and_minitasks || [], p = h.texts || [], q = h.instructional_resources || [], r = h.education_standards || [], s = h.student_work_samples || [], t = a.ldcDbData.minitasks || [];
    for (b.forEach(function(a) {
        switch (a) {
          case "title":
            g.push(h.title);
            break;

          case "description":
            g.push(stripHtml(h.description));
            break;

          case "background_for_students":
            g.push(stripHtml(h.background_for_students));
            break;

          case "extension":
            g.push(stripHtml(h.extension));
            break;

          case "curriculum.course_name":
            g.push(i.course_name);
            break;

          case "curriculum.lower_grade":
            g.push(i.lower_grade);
            break;

          case "curriculum.upper_grade":
            g.push(i.upper_grade);
            break;

          case "curriculum.discipline.name":
            g.push(j.name);
            break;

          case "teaching_task.substitutions":
            g.push(l.join(" "));
            break;

          case "teaching_task.template.lower_grade":
            g.push(m.lower_grade);
            break;

          case "teaching_task.template.upper_grade":
            g.push(m.upper_grade);
            break;

          case "teaching_task.template.phase_name":
            g.push(m.phase_name);
            break;

          case "teaching_task.template.writing_type.name":
            var b = m.writing_type || {};
            g.push(b.name);
            break;

          case "teaching_task.template.writing_sub_type.name":
            var k = m.writing_sub_type || {};
            g.push(k.name);
            break;

          case "teaching_task.demands.count":
            g.push(n.length);
            break;

          case /teaching_task.demands.[0-9]+.template.prompt/.test(a):
            c = a.split("."), d = Number(c[2]), n[d] && n[d].template ? g.push(n[d].template.prompt) : g.push("");
            break;

          case "skills_and_minitasks.count":
            g.push(o.length);
            break;

          case /skills_and_minitasks.[0-9]+.name/.test(a):
            c = a.split("."), d = Number(c[1]), o[d] ? g.push(o[d].name) : g.push("");
            break;

          case /skills_and_minitasks.[0-9]+.skills.count/.test(a):
            c = a.split("."), d = Number(c[1]), o[d] && o[d].skills ? g.push(o[d].skills.length) : g.push("");
            break;

          case /skills_and_minitasks.[0-9]+.skills.[0-9]+.name/.test(a):
          case /skills_and_minitasks.[0-9]+.skills.[0-9]+.definition/.test(a):
            c = a.split("."), d = Number(c[1]), e = Number(c[3]), f = c(4), o[d] && o[d].skills && o[d].skills[e] ? g.push(o[d].skills[e][f]) : g.push("");
            break;

          case "texts.count":
            g.push(p.length);
            break;

          case /texts.[0-9]+.class_name/.test(a):
          case /texts.[0-9]+.name/.test(a):
          case /texts.[0-9]+.description/.test(a):
            c = a.split("."), d = Number(c[1]), f = c(2), p[d] ? g.push(p[d][f]) : g.push("");
            break;

          case "instructional_resources.count":
            g.push(q.length);
            break;

          case /instructional_resources.[0-9]+.name/.test(a):
            c = a.split("."), d = Number(c[1]), q[d] ? g.push(q[d].name) : g.push("");
            break;

          case "education_standards.count":
            g.push(r.length);
            break;

          case /education_standards.[0-9]+.education_standard.description/.test(a):
          case /education_standards.[0-9]+.education_standard.standards_group/.test(a):
          case /education_standards.[0-9]+.education_standard.alt_standards_group/.test(a):
          case /education_standards.[0-9]+.education_standard.education_standards_document_title/.test(a):
          case /education_standards.[0-9]+.education_standard.lower_grade/.test(a):
          case /education_standards.[0-9]+.education_standard.upper_grade/.test(a):
            c = a.split("."), d = Number(c[1]), f = c[3], r[d] && r[d].education_standard ? g.push(r[d].education_standard[f]) : g.push("");
            break;

          case /education_standards.[0-9]+.education_standard.subjects.label/.test(a):
            c = a.split("."), d = Number(c[1]), r[d] && r[d].education_standard && r[d].education_standard.subjects ? g.push(r[d].education_standard.subjects.label) : g.push("");
            break;

          case /education_standards.[0-9]+.education_standard.standards_path.[0-9]+.description/.test(a):
            c = a.split("."), d = Number(c[1]), e = Number(c[4]), r[d] && r[d].education_standard && r[d].education_standard.standards_path && r[d].education_standard.standards_path[e] ? g.push(r[d].education_standard.standards_path[e].description) : g.push("");
            break;

          case "teacher_reflection":
            g.push(stripHtml(h.teacher_reflection));
            break;

          case "student_work_samples.count":
            g.push(s.length);
            break;

          case /student_work_samples.[0-9]+.attachment_point_option_code/.test(a):
            c = a.split("."), d = Number(c[1]), s[d] ? g.push(s[d].attachment_point_option_code) : g.push("");
            break;

          case "minitasks.count":
            g.push(t.length);
            break;

          case /minitasks.[0-9]+.product_name/.test(a):
          case /minitasks.[0-9]+.prompt/.test(a):
          case /minitasks.[0-9]+.scoring_guide/.test(a):
          case /minitasks.[0-9]+.instructional_strategies/.test(a):
          case /minitasks.[0-9]+.pacing/.test(a):
            c = a.split("."), d = Number(c[1]), f = c(2), t[d] ? g.push(t[d][f]) : g.push("");
            break;

          default:
            g.push("");
        }
    }); g.indexOf(null) > -1; ) g[g.indexOf(null)] = "";
    return {
        Inputs: {
            input: {
                ColumnNames: b,
                Values: [ g ]
            }
        },
        GlobalParameters: {}
    };
}

var request = require("request"), url = require("url"), mongoose = require("mongoose"), Module = mongoose.model("Module"), error = require("../../error"), logger = require("../../logger"), cfg = require("../data/module.prediction.api.config");

exports.predict = function(a, b) {
    if (logger.filename(__filename), !a.query.id) return b.status(500).send("!req.query.id");
    if (!a.query.indicator) return b.status(500).send("!req.query.indicator");
    var c = cfg[a.query.indicator];
    return logger.bold(c), c && c.apiKey && c.apiEndpoint && c.columnNames ? void Module.findById(a.query.id).exec(function(d, e) {
        return d ? (error.log(new Error(d)), b.status(500).send(d)) : e ? void request({
            method: "POST",
            url: url.parse(c.apiEndpoint),
            auth: {
                bearer: c.apiKey
            },
            json: parseModule(e, c.columnNames)
        }, function(c, d, f) {
            if (c) return error.log(new Error(c)), b.status(500).send(c);
            if (!f) return error.log(new Error("!body")), b.status(500).send("!body");
            var g;
            if (!(f && f.Results && f.Results.output && f.Results.output.value && f.Results.output.value.Values && f.Results.output.value.Values[0] && f.Results.output.value.Values[0][0])) {
                c = new Error("!score");
                try {
                    c.body = JSON.parse(f);
                } catch (h) {
                    c.body = "error parsing body";
                }
                return error.log(c), b.status(500).send("!score");
            }
            g = Number(f.Results.output.value.Values[0][0]);
            var i = {
                $set: {}
            };
            return i.$set["predictedScores." + a.query.indicator] = g, Module.update({
                _id: e._id
            }, i, function(a) {
                a && error.log(new Error(a));
            }), b.status(200).send(g.toString());
        }) : (error.log(new Error("!moduleDoc")), b.status(500).send("!moduleDoc"));
    }) : b.status(500).send("!indicatorConfig");
};