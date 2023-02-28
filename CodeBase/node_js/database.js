const { Client } = require('pg');

const client = new Client({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: "Scout101", //change password!
	database: "studio_to_stadium"
})

client.connect();
//need to change pk to add new row
client.query('INSERT INTO users VALUES (2, \'a@gmail.com\', \'joe\', \'mama\', 0987654321, false, \'swordfish\', DATE \'2024-05-24\', false)', (err, res)=>{
	if(!err){
		console.log(res.rows);
	}
	else {
		console.log(err.message);
	}
})

client.query('Select * from users', (err, res)=>{
	if(!err){
		console.log(res.rows);
	}
	else {
		console.log(err.message);
	}
})


//need to encrypt password somehow?
//INSERT INTO users VALUES (2, "a@gmail.com", "joe", "mama", 0987654321, false, "swordfish", 4/23/2024, false)
client.end;