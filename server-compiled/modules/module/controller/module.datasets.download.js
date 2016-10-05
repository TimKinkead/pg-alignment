"use strict";

function csvEscape(a) {
    return '"' + String(a || "").replace(/\"/g, '""') + '"';
}

function stripHtml(a) {
    return a = a.replace(/<[^>]*>/g, " "), a = a.replace(/&#xA0;/g, " "), a = a.replace(/[\s]{2,10}/g, " ");
}

function extractCsvHeaders(a, b) {
    if (!a || !a.length || !b) return "";
    var c, d, e, f, g, h = [];
    return a.forEach(function(a) {
        switch (c = null, d = null, e = null, f = null, g = null, a) {
          case "teaching_task.demands.template.prompt":
            if (b.teachingTaskDemands && b.teachingTaskDemands > 1) for (c = 0, d = b.teachingTaskDemands; c < d; c++) g = a.split("."), 
            g.splice(2, 0, c), h.push(g.join(".")); else h.push(a);
            break;

          case "skills_and_minitasks.name":
            if (b.skillsAndMinitasks && b.skillsAndMinitasks > 1) for (c = 0, d = b.skillsAndMinitasks; c < d; c++) g = a.split("."), 
            g.splice(1, 0, c), h.push(g.join(".")); else h.push(a);
            break;

          case "skills_and_minitasks.skills.name":
          case "skills_and_minitasks.skills.definition":
            if (b.skillsAndMinitasks && b.skillsAndMinitasks > 1) for (c = 0, d = b.skillsAndMinitasks; c < d; c++) if (b.skillsAndMinitasksSkills && b.skillsAndMinitasksSkills > 1) for (e = 0, 
            f = b.skillsAndMinitasksSkills; e < f; e++) g = a.split("."), g.splice(2, 0, e), 
            g.splice(1, 0, c), h.push(g.join(".")); else g = a.split("."), g.splice(1, 0, c), 
            h.push(g.join(".")); else h.push(a);
            break;

          case "texts.class_name":
          case "texts.name":
          case "texts.description":
            if (b.texts && b.texts > 1) for (c = 0, d = b.texts; c < d; c++) g = a.split("."), 
            g.splice(1, 0, c), h.push(g.join(".")); else h.push(a);
            break;

          case "instructional_resources.name":
            if (b.instructionalResources && b.instructionalResources > 1) for (c = 0, d = b.instructionalResources; c < d; c++) g = a.split("."), 
            g.splice(1, 0, c), h.push(g.join(".")); else h.push(a);
            break;

          case "education_standards.education_standard.description":
          case "education_standards.education_standard.standards_group":
          case "education_standards.education_standard.alt_standards_group":
          case "education_standards.education_standard.education_standards_document_title":
          case "education_standards.education_standard.lower_grade":
          case "education_standards.education_standard.upper_grade":
            if (b.educationStandards && b.educationStandards > 1) for (c = 0, d = b.educationStandards; c < d; c++) g = a.split("."), 
            g.splice(1, 0, c), h.push(g.join(".")); else h.push(a);
            break;

          case "education_standards.education_standard.subjects.label":
            if (b.educationStandards && b.educationStandards > 1) for (c = 0, d = b.educationStandards; c < d; c++) if (b.educationStandardsSubjects && b.educationStandardsSubjects > 1) for (e = 0, 
            f = b.educationStandardsSubjects; e < f; e++) g = a.split("."), g.splice(3, 0, e), 
            g.splice(1, 0, c), h.push(g.join(".")); else g = a.split("."), g.splice(1, 0, c), 
            h.push(g.join(".")); else h.push(a);
            break;

          case "education_standards.education_standard.standards_path.description":
            if (b.educationStandards && b.educationStandards > 1) for (c = 0, d = b.educationStandards; c < d; c++) if (b.educationStandardsPath && b.educationStandardsPath > 1) for (e = 0, 
            f = b.educationStandardsPath; e < f; e++) g = a.split("."), g.splice(3, 0, e), g.splice(1, 0, c), 
            h.push(g.join(".")); else g = a.split("."), g.splice(1, 0, c), h.push(g.join(".")); else h.push(a);
            break;

          case "student_work_samples.attachment_point_option_code":
            if (b.studentWorkSamples && b.studentWorkSamples > 1) for (c = 0, d = b.studentWorkSamples; c < d; c++) g = a.split("."), 
            g.splice(1, 0, c), h.push(g.join(".")); else h.push(a);
            break;

          case "minitasks.product_name":
          case "minitasks.prompt":
          case "minitasks.scoring_guide":
          case "minitasks.instructional_strategies":
          case "minitasks.pacing":
            if (b.minitasks && b.minitasks > 1) for (c = 0, d = b.minitasks; c < d; c++) g = a.split("."), 
            g.splice(1, 0, c), h.push(g.join(".")); else h.push(a);
            break;

          default:
            h.push(a);
        }
    }), h = h.concat([ "indicator", "score" ]), h.map(csvEscape).join(",") + "\n";
}

function extractCsvData(a, b, c, d) {
    if (!(a && b && b.length && c && d && d.ldcDbData && d.manualScores)) return "";
    var e, f, g, h, i, j = [], k = "", l = d.ldcDbData.body || {}, m = l.curriculum || {}, n = m.discipline || {}, o = l.teaching_task || {}, p = o.substitutions || [], q = o.template || {}, r = o.demands || [], s = l.skills_and_minitasks || [], t = l.texts || [], u = l.instructional_resources || [], v = l.education_standards || [], w = l.student_work_samples || [], x = d.ldcDbData.minitasks || [], y = d.manualScores;
    b.forEach(function(a) {
        switch (a) {
          case "ldcId":
            j.push(d.ldcId);
            break;

          case "title":
            j.push(l.title);
            break;

          case "description":
            j.push(stripHtml(l.description));
            break;

          case "background_for_students":
            j.push(stripHtml(l.background_for_students));
            break;

          case "extension":
            j.push(stripHtml(l.extension));
            break;

          case "curriculum.course_name":
            j.push(m.course_name);
            break;

          case "curriculum.lower_grade":
            j.push(m.lower_grade);
            break;

          case "curriculum.upper_grade":
            j.push(m.upper_grade);
            break;

          case "curriculum.discipline.name":
            j.push(n.name);
            break;

          case "teaching_task.substitutions":
            j.push(p.join(" "));
            break;

          case "teaching_task.template.lower_grade":
            j.push(q.lower_grade);
            break;

          case "teaching_task.template.upper_grade":
            j.push(q.upper_grade);
            break;

          case "teaching_task.template.phase_name":
            j.push(q.phase_name);
            break;

          case "teaching_task.template.writing_type.name":
            var b = q.writing_type || {};
            j.push(b.name);
            break;

          case "teaching_task.template.writing_sub_type.name":
            var k = q.writing_sub_type || {};
            j.push(k.name);
            break;

          case "teaching_task.demands.count":
            j.push(r.length);
            break;

          case "teaching_task.demands.template.prompt":
            if (c.teachingTaskDemands && c.teachingTaskDemands > 1) for (e = 0, f = c.teachingTaskDemands; e < f; e++) r[e] && r[e].template ? j.push(r[e].template.prompt) : j.push(""); else j.push("");
            break;

          case "skills_and_minitasks.count":
            j.push(s.length);
            break;

          case "skills_and_minitasks.name":
            if (c.skillsAndMinitasks && c.skillsAndMinitasks > 1) for (e = 0, f = c.skillsAndMinitasks; e < f; e++) s[e] ? j.push(s[e].name) : j.push(""); else j.push("");
            break;

          case "skills_and_minitasks.skills.count":
            var o = 0;
            s.forEach(function(a) {
                a.skills && a.skills.length && (o += a.skills.length);
            }), j.push(o);
            break;

          case "skills_and_minitasks.skills.name":
          case "skills_and_minitasks.skills.definition":
            if (c.skillsAndMinitasks && c.skillsAndMinitasks > 1) for (i = a.slice(a.lastIndexOf(".") + 1, a.length), 
            e = 0, f = c.skillsAndMinitasks; e < f; e++) if (c.skillsAndMinitasksSkills && c.skillsAndMinitasksSkills > 1) {
                var y = s[e] ? s[e].skills : [];
                for (g = 0, h = c.skillsAndMinitasksSkills; g < h; g++) s[e] && y[g] ? j.push(s[e].skills[g][i]) : j.push("");
            } else j.push(""); else j.push("");
            break;

          case "texts.count":
            j.push(t.length);
            break;

          case "texts.class_name":
          case "texts.name":
          case "texts.description":
            if (c.texts && c.texts > 1) for (i = a.slice(a.indexOf(".") + 1, a.length), e = 0, 
            f = c.texts; e < f; e++) t[e] ? j.push(t[e][i]) : j.push(""); else j.push("");
            break;

          case "instructional_resources.count":
            j.push(u.length);
            break;

          case "instructional_resources.name":
            if (c.instructionalResources && c.instructionalResources > 1) for (e = 0, f = c.instructionalResources; e < f; e++) u[e] ? j.push(u[e].name) : j.push(""); else j.push("");
            break;

          case "education_standards.count":
            j.push(v.length);
            break;

          case "education_standards.education_standard.description":
          case "education_standards.education_standard.standards_group":
          case "education_standards.education_standard.alt_standards_group":
          case "education_standards.education_standard.education_standards_document_title":
          case "education_standards.education_standard.lower_grade":
          case "education_standards.education_standard.upper_grade":
            if (c.educationStandards && c.educationStandards > 1) for (i = a.slice(a.lastIndexOf(".") + 1, a.length), 
            e = 0, f = c.educationStandards; e < f; e++) v[e] && v[e].education_standard ? j.push(v[e].education_standard[i]) : j.push(""); else j.push("");
            break;

          case "education_standards.education_standard.subjects.label":
            if (c.educationStandards && c.educationStandards > 1) for (e = 0, f = c.educationStandards; e < f; e++) if (c.educationStandardsSubjects && c.educationStandardsSubjects > 1) {
                var z = v[e] && v[e].education_standard && v[e].education_standard.subjects ? v[e].education_standard.subjects : [];
                for (g = 0, h = c.educationStandardsSubjects; g < h; g++) z[g] ? j.push(z[g].label) : j.push("");
            } else j.push(""); else j.push("");
            break;

          case "education_standards.education_standard.standards_path.description":
            if (c.educationStandards && c.educationStandards > 1) for (e = 0, f = c.educationStandards; e < f; e++) if (c.educationStandardsPath && c.educationStandardsPath > 1) {
                var A = v[e] && v[e].education_standard && v[e].education_standard.standards_path ? v[e].education_standard.standards_path : [];
                for (g = 0, h = c.educationStandardsPath; g < h; g++) A[g] ? j.push(A[g].description) : j.push("");
            } else j.push(""); else j.push("");
            break;

          case "teacher_reflection":
            j.push(stripHtml(l.teacher_reflection));
            break;

          case "student_work_samples.count":
            j.push(w.length);
            break;

          case "student_work_samples.attachment_point_option_code":
            if (c.studentWorkSamples && c.studentWorkSamples > 1) for (e = 0, f = c.studentWorkSamples; e < f; e++) w[e] ? j.push(w[e].attachment_point_option_code) : j.push(""); else j.push("");
            break;

          case "minitasks.count":
            j.push(x.length);
            break;

          case "minitasks.product_name":
          case "minitasks.prompt":
          case "minitasks.scoring_guide":
          case "minitasks.instructional_strategies":
          case "minitasks.pacing":
            if (c.minitasks && c.minitasks > 1) for (i = a.slice(a.lastIndexOf(".") + 1, a.length), 
            e = 0, f = c.minitasks; e < f; e++) x[e] ? j.push(stripHtml(x[e][i])) : j.push(""); else j.push("");
            break;

          default:
            j.push("");
        }
    });
    for (var z in y) if (y.hasOwnProperty(z) && 0 === z.indexOf(a)) {
        var A = z.slice(0, 4), B = j.concat([ A, y[z] ]);
        k += B.map(csvEscape).join(",") + "\n";
    }
    return k;
}

var fs = require("fs"), fse = require("fs-extra"), _ = require("lodash"), archiver = require("archiver"), mongoose = require("mongoose"), Module = mongoose.model("Module"), error = require("../../error"), logger = require("../../logger");

exports.downloadDatasets = function(a, b) {
    function c() {
        logger.dash("zip and return"), b.setHeader("Content-disposition", 'attachment; filename="alignment-datasets.zip"'), 
        b.contentType("application/zip");
        var a = archiver("zip");
        a.pipe(b), k.forEach(function(b) {
            a.file("./temp/alignment-datasets/" + b, {
                name: b
            });
        }), a.finalize();
    }
    function d() {
        logger.dash("streaming modules");
        var a = 0;
        Module.find({
            manualScores: {
                $exists: !0
            },
            ldcDbData: {
                $exists: !0
            }
        }).stream().on("data", function(b) {
            a++, a % 100 === 0 && logger.arrow("module " + a), j.forEach(function(a) {
                var c = a.indicatorCategory.indicatorPrefix, d = a.indicatorCategory.featureFields, e = extractCsvData(c, d, i, b);
                a.stream.write(e);
            });
        }).on("close", function() {
            j.forEach(function(a) {
                a.stream.end();
            }), c();
        }).on("error", function(a) {
            error.log(new Error(a));
        });
    }
    function e() {
        logger.dash("starting write streams"), h.forEach(function(a) {
            var b = "alignment-dataset_" + a.filename + ".csv", c = fs.createWriteStream("temp/alignment-datasets/" + b), d = extractCsvHeaders(a.featureFields, i);
            c.write(d), k.push(b), j.push({
                indicatorCategory: a,
                stream: c
            });
        }), d();
    }
    function f() {
        function a() {
            i.teachingTaskDemands = Math.min(i.teachingTaskDemands, 5), i.skillsAndMinitasks = Math.min(i.skillsAndMinitasks, 6), 
            i.skillsAndMinitasksSkills = Math.min(i.skillsAndMinitasksSkills, 10), i.texts = Math.min(i.texts, 20), 
            i.instructionalResources = Math.min(i.instructionalResources, 20), i.educationStandards = Math.min(i.educationStandards, 20), 
            i.educationStandardsSubjects = Math.min(i.educationStandardsSubjects, 4), i.educationStandardsPath = Math.min(i.educationStandardsPath, 5), 
            i.studentWorkSamples = Math.min(i.studentWorkSamples, 20), i.minitasks = Math.min(i.minitasks, 25);
        }
        function b() {
            f -= 1, f <= 0 && (g.forEach(function(a) {
                i = _.extend(i, a);
            }), a(), e());
        }
        function c(a) {
            Module.aggregate(a).exec(function(a, c) {
                a ? error.log(new Error(a)) : c ? c[0] && g.push(c[0]) : error.log(new Error("!results")), 
                b();
            });
        }
        logger.dash("getting field maximums");
        var d = [ [ {
            $match: {
                spreadsheetData: {
                    $exists: !0
                },
                ldcDbData: {
                    $exists: !0
                }
            }
        }, {
            $group: {
                _id: null,
                teachingTaskDemands: {
                    $max: {
                        $size: "$ldcDbData.body.teaching_task.demands"
                    }
                },
                skillsAndMinitasks: {
                    $max: {
                        $size: "$ldcDbData.body.skills_and_minitasks"
                    }
                },
                texts: {
                    $max: {
                        $size: "$ldcDbData.body.texts"
                    }
                },
                instructionalResources: {
                    $max: {
                        $size: "$ldcDbData.body.instructional_resources"
                    }
                },
                educationStandards: {
                    $max: {
                        $size: "$ldcDbData.body.education_standards"
                    }
                },
                studentWorkSamples: {
                    $max: {
                        $size: "$ldcDbData.body.student_work_samples"
                    }
                },
                minitasks: {
                    $max: {
                        $size: "$ldcDbData.minitasks"
                    }
                }
            }
        } ], [ {
            $match: {
                spreadsheetData: {
                    $exists: !0
                },
                ldcDbData: {
                    $exists: !0
                }
            }
        }, {
            $project: {
                skillsAndMinitasks: "$ldcDbData.body.skills_and_minitasks"
            }
        }, {
            $unwind: "$skillsAndMinitasks"
        }, {
            $project: {
                skills: {
                    $ifNull: [ "$skillsAndMinitasks.skills", [] ]
                }
            }
        }, {
            $group: {
                _id: null,
                skillsAndMinitasksSkills: {
                    $max: {
                        $size: "$skills"
                    }
                }
            }
        } ], [ {
            $match: {
                spreadsheetData: {
                    $exists: !0
                },
                ldcDbData: {
                    $exists: !0
                }
            }
        }, {
            $project: {
                educationStandards: "$ldcDbData.body.education_standards"
            }
        }, {
            $unwind: "$educationStandards"
        }, {
            $project: {
                subjects: {
                    $ifNull: [ "$educationStandards.education_standard.subjects", [] ]
                },
                path: {
                    $ifNull: [ "$educationStandards.education_standard.standards_path", [] ]
                }
            }
        }, {
            $group: {
                _id: null,
                educationStandardsSubjects: {
                    $max: {
                        $size: "$subjects"
                    }
                },
                educationStandardsPath: {
                    $max: {
                        $size: "$path"
                    }
                }
            }
        } ] ], f = 0, g = [];
        f = d.length, d.forEach(function(a) {
            c(a);
        });
    }
    function g() {
        function a() {
            fs.mkdir("./temp/alignment-datasets", function(a) {
                return a ? (error.log(new Error(a)), b.status(500).send({
                    error: a
                })) : void f();
            });
        }
        logger.dash("checkDirectories"), fs.stat("./temp", function(c, d) {
            return "ENOENT" === c ? void fs.mkdir("./temp", function(c) {
                return c ? (error.log(new Error(c)), b.status(500).send({
                    error: c
                })) : void a();
            }) : void fs.stat("./temp/alignment-datasets", function(c, d) {
                return c ? void a() : void fse.remove("./temp/alignment-datasets", function(c) {
                    return c ? (error.log(new Error(c)), b.status(500).send({
                        error: c
                    })) : void a();
                });
            });
        });
    }
    logger.filename(__filename);
    var h = require("./module.datasets.config.js").indicatorCategories, i = {}, j = [], k = [];
    g();
};