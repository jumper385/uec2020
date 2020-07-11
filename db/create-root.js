db.createUser({
    user: "chenry",
    psd: "st18chenh",
    roles: [{
        role: 'readWrite',
        db: amydb
    }]
})