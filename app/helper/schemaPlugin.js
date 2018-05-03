module.exports = function(schema) {

    var updateTimestemps = function(next){
        var self = this;

        self.update({},{ $set: {updatedAt: new Date() } });

        next();
    };

    schema.
    pre('save', updateTimestemps ).
    pre('update', updateTimestemps ).
    pre('findOneAndUpdate', updateTimestemps);
};