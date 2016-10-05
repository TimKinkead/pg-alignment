

need to download `modules.csv` for `module.init.from.modules.js`

download pgAdmin

connect to LDC database

name: d10plonoapfmhk
Hostname	ec2-52-203-7-65.compute-1.amazonaws.com
port: 5432
maint name: d10plonoapfmhk
user name: u3o47uqdgn6hqa
password: p7eb1punia0jv87f82323t108fv

perform this query

SELECT 
  mods.id, 
  mods.name, 
  mods.description, 
  mods.user_id, 
  mods.created_at, 
  mods.updated_at, 
  mods.discipline_id, 
  mods.json_data AS "body", 
  mods.lower_grade, 
  mods.upper_grade, 
  mods.source, 
  mods.source_url, 
  mods.writing_type_id, 
  mods.uuid, 
  mods.cloned_from_id, 
  mods.is_deleted, 
  mods.garbage_collected_at, 
  mods.is_attribution_visible, 
  mods.ldc_rating_id, 
  mods.json_schema_version, 
  mods.is_featured, 
  mods.is_calibration, 
  mods.snapshot_of_id, 
  mods.snapshot_name, 
  mods.snapshot_taken_at, 
  mods.snapshot_taken_by_user_id, 
  mods.is_course_product, 
  mods.content_updated_at
FROM 
  coretools.mods
  
~93,000 rows 10-20mins for query to run

export to csv with `CR/LF` line breaks and `;` as delimiter

pgAdmin takes a shit on export, & not all rows exported (I think)   
so need to break into batches with `WHERE id >= 20000 AND id < 40000`

Just get scored modules

Mongo Shell
var ids = ""
var cur = db.modules.find({spreadsheetData: {$exists: true}}, {'spreadsheetData.id': true})
cur.forEach(function(doc) { if (doc && doc.spreadsheetData && doc.spreadsheetData.id) { ids += (ids.length) ? ", "+doc.spreadsheetData.id : doc.spreadsheetData.id; } })
ids

Copy list of ids output to console

pgAdmin Query
SELECT
  <see above>
FROM 
  coretools.mods
WHERE
  id IN(<paste list of ids here>)
  
