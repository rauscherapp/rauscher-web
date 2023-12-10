import { AspNetUser } from "app/core/aspnetuser/aspnetusers.types";

function generateMockUsers(): AspNetUser[] {
    const mockUsers: AspNetUser[] = [];
    const names = [
      'John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry',
      'Ivy', 'Jack', 'Karen', 'Leo', 'Mia', 'Nick', 'Olivia', 'Peter', 'Quinn', 'Rachel',
      'Sam', 'Tina', 'Ulysses', 'Vivian', 'William', 'Xena', 'Yasmine', 'Zack',
      'Sophia', 'Liam', 'Emma', 'Noah', 'Olivia', 'Isabella', 'Sophie', 'Aiden', 'Mia', 'Amelia',
      'Ethan', 'Lucas', 'Alexander', 'Ava', 'Harper', 'Benjamin', 'Aria', 'Ella', 'Logan', 'Jackson',
      'Grace', 'Scarlett', 'Leo', 'Lily', 'Hudson', 'Zoe', 'Julia', 'Elijah', 'Daniel', 'Nora',
      'Caleb', 'Mila', 'Emily', 'Chloe', 'Hazel', 'Wyatt', 'Liam', 'Charlotte', 'Ruby', 'Evelyn',
      'Jackson', 'Amelia', 'Abigail', 'Luke', 'Madison', 'Avery', 'Gabriel', 'Ella', 'Luna', 'Ezra',
      'Isaac', 'Scarlett', 'Aurora', 'Owen', 'Penelope', 'Lucy', 'Lily', 'Landon', 'Aria', 'Grace',
      'Michael', 'Sofia', 'Ellie', 'Aiden', 'Liam', 'Emma', 'Olivia', 'Sophia', 'Noah', 'Isabella'
    ];
    const lastNames = [
      'Doe', 'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore',
      'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Clark', 'Lee', 'Wright', 'Martin',
      'Allen', 'Young', 'Turner', 'Cooper', 'Ward', 'Fisher', 'Barnes', 'Perry', 'Hill', 'Scott',
      'King', 'Green', 'Evans', 'Turner', 'Baker', 'Evans', 'Hill', 'Lopez', 'Cole', 'Ward',
      'Morris', 'Perry', 'Long', 'Fisher', 'Barnes', 'Ward', 'Dixon', 'Bryant', 'Ward', 'Harper',
      'Lee', 'Reed', 'Stewart', 'Parker', 'Young', 'Evans', 'Cox', 'Fisher', 'Powell', 'Hill',
      'Murray', 'Henderson', 'Harris', 'Taylor', 'Cox', 'Ward', 'Scott', 'Reed', 'Howard', 'Johnson',
      'Evans', 'Dixon', 'Graham', 'Ward', 'Lee', 'Barnes', 'Ross', 'Evans', 'Hill', 'Ward',
      'Cox', 'Cooper', 'Clark', 'Fisher', 'Ward', 'Hill', 'Murray', 'Henderson', 'Harris', 'Taylor',
    ];    
  
    for (let i = 1; i <= 600; i++) {
      const firstName = names[Math.floor(Math.random() * names.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const id = i.toString();
      const userName = `${firstName}${i}`;
      const normalizedUserName = userName.toUpperCase();
      const email = `${firstName.toLowerCase()}_${lastName.toLowerCase()}@example.com`;
      const normalizedEmail = email.toUpperCase();
  
      const user: AspNetUser = {
        id,
        userName,
        normalizedUserName : `${firstName} ${lastName}` ,
        email,
        normalizedEmail,
        emailConfirmed: true,
        passwordHash: `hashedPassword${i}`,
        password: `password${i}`,
        confirmPassword: `password${i}`,
        securityStamp: `securityStamp${i}`,
        concurrencyStamp: `concurrencyStamp${i}`,
        phoneNumber: `123456789${i}`,
        phoneNumberConfirmed: i % 2 === 0,
        twoFactorEnabled: i % 3 === 0,
        lockoutEnd: i % 5 === 0 ? new Date(`2023-01-${i % 28 + 1}T12:00:00Z`) : null,
        lockoutEnabled: i % 7 !== 0,
        accessFailedCount: i % 4,
      };
  
      mockUsers.push(user);
    }
  
    return mockUsers;
  }
  
  export const mockUsers = generateMockUsers();
  
  export default mockUsers;