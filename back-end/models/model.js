module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      gender: String,
      birthdate: Date,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Kitten = mongoose.model("kitten", schema);
  return Kitten;
};