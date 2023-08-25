export const loginV1 = (req, res, next) => {
    res.status(req.data.status).send(req.data);
}