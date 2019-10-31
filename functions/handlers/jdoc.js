const {db} = require('../util/admin');
exports.createJDoc = async (req, res) => {
    //inputs:
    //title, content, delta
    let date = new Date();
    const newDoc = {
        title: req.body.title,
        username: req.user.username,
        createdAt: date.toUTCString(),
        createdAtTimestamp: date.getTime(), 
    };
    const newContent = {
      content: req.body.content,
      delta: req.body.delta,
      docId: "",
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime(),
      username: req.user.username
    };
    try {
        let doc = await db.collection("jdoc").add(newDoc);
        let responseDoc = {
            jdoc: {},
            content: ''
        };
        responseDoc.jdoc = newDoc;
        responseDoc.jdoc.docId = doc.id;
        newContent.docId = doc.id;
        await db.collection("jcontent").add(newContent);
        responseDoc.content = newContent.content;
        return res.status(200).json(responseDoc);
    }
    catch(err){
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
    }
}
