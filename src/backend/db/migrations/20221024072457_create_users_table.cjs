exports.up = function(knex) {
    return knex.schema
      .createTable('users', function (table) {
        table.increments('id');
        table.string('login', 255).unique().nullable();
        table.string('email', 255).unique().nullable();
        table.string('password', 255);
        table.string('role', 255);
        table.boolean('isActivate');
        table.string('accessToken', 255).nullable();
        table.string('refreshToken', 255).nullable();
        table.timestamps();
      });
};
  
exports.down = function(knex) {
    return knex.schema
      .dropTable('users');
};