const Application = require('../models/applications');
const { compare } = require('../utils/sortHelper');
const { cloudinary } = require('../config/cloudinary');


const getAllApplications = async (req, res) => {

    try {

        console.log(req.query);
        let collumn = req.query._sort;
        let filter = req.query.q;

        Application.findAll()
            .then(applications => {
                res.header('Access-Control-Expose-Headers', 'X-Total-Count');
                res.header('X-Total-Count', `${applications.length}`);

                if (filter) {
                    // Apply the filter logic
                    applications = applications.filter((app) =>
                      app.id.toString().includes(filter) // Adjust the filtering condition based on your requirements
                    );
                  } else if (collumn === "id") {
                    req.query._order === "ASC" ? applications.sort((a, b) => parseInt(a[collumn]) - parseInt(b[collumn])) : applications.sort((a, b) => parseInt(b[collumn]) - parseInt(a[collumn]));
                    applications = applications.slice(req.query._start, req.query._end);
                } else if ( collumn === "createdAt" || collumn === "updatedAt") {
                    req.query._order === "ASC" ? applications.sort((a, b) => a[collumn] - b[collumn]) : applications.sort((a, b) => b[collumn] - a[collumn]);
                    applications = applications.slice(req.query._start, req.query._end);
                }
                else if (collumn !== undefined) {
                    applications.sort((a, b) => compare(a[collumn], b[collumn], req.query._order));
                    applications = applications.slice(req.query._start, req.query._end);
                }

                res.send(applications);
            })
            .catch(err => {
                console.log(err)
                res.send("Error")
            })
    } catch (e) {
        res.send(e)
    }
};

const getApplicationById = async (req, res) => {
    try {
        let {
            id
        } = req.params;

        const row = await Application.findOne({
            where: { id: id },
        });
        res.json(row);
    } catch (e) {
        res.send(e)
    }

};

const addApplication = async (req, res) => {

    const resumeData = req.file;
    let resumeUrl = resumeData.filename;

    let {
        name,
        email,
        phone
    } = JSON.parse(req.body.data);

    if (resumeData) {
        const result = await cloudinary.uploader.upload(resumeData.path, {
            upload_preset: 'fgrbpl_preset'
        });
        resumeUrl = result.secure_url;
    }

    Application.create({
        name,
        email,
        phone,
        resumeUrl,
    }).then(application => {
        res.send(application);
    }
    ).catch(err => {
        res.send(err.errors[0].message);
    })

};

const editApplicationById = async (req, res) => {
    const data = JSON.parse(req.body.data);
    const resumeData = req.file;

    try {
        const { id } = req.params;
        let output_str = "";

        let collumns = [
            "name",
            "email",
            "phone"
        ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (const element of collumns) {

            if (data.hasOwnProperty(element)) {
                check = false;
                let key = element;
                const value = data[key];
                await Application.update(
                    { [key]: value }, 	// attribute
                    { where: { id: id } }			// condition
                );

                output_str += `Application ${key} was updated with value ${value}\n`;
            }
        }

        if (resumeData) {
            check = false;
            const result = await cloudinary.uploader.upload(resumeData.path, {
                upload_preset: 'fgrbpl_preset'
            });

            await Application.update(
                { "resumeUrl": result.secure_url },
                { where: { id: id } }
            );
            output_str += `Application resumeUrl was updated with value ${result.secure_url}\n`;
        }

        if (check) {
            res.send("Attribute passed does not exist or null attribute passed")
        } else {
            console.log(output_str);
            res.json(data);
        }

    } catch (e) {
        res.send(e.message)
        console.log(e.message)
    }

};

const deleteApplicationById = async (req, res) => {
    try {
        let {
            id
        } = req.params;

        const row = await Application.findOne({
            where: { id: id },
        });

        if (row) {
            await row.destroy(); // deletes the row
            res.json(row)
            console.log(`Entry for ${row.name} deleted succesfully.`);
        } else {
            res.send('Application does not exist.')
        }
    } catch (e) {
        res.send(e)
    }
};


module.exports = {
    getAllApplications,
    getApplicationById,
    addApplication,
    editApplicationById,
    deleteApplicationById,
};