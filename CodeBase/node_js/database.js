const { Client } = require('pg');

const client = new Client({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: "Scout101",
	database: "studio_to_stadium"
})

client.connect();

client.query('Select * from users', (err, res)=>{
	if(!err){
		console.log(res.rows);
	}
	else {
		console.log(err.message);
	}
})

client.query('Select user_id from users', (err, res)=>{
	if(!err){
		console.log(res.rows);
	}
	else {
		console.log(err.message);
	}
})

INSERT INTO client VALUES (2, "a@gmail.com", "joe", "mama", 0987654321, false, "swordfish", )

client.end;