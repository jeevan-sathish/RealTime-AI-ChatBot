class Ecart:

    users = [
        {"name": "jeevan", "password": 1234},
        {"name": "chintu", "password": 3451}
    ]

    def __init__(self, name, password):
        self.name = name
        self.password = password

    def login(self):
        print("Login successful")
        self.dashboard()

    def dashboard(self):
        print(f"Welcome {self.name} to Ecart")

    def validation(self):
        for user in self.users:
            if user["name"] == self.name and user["password"] == self.password:
                self.login()
                return  

      
        self.users.append({
            "name": self.name,
            "password": self.password
        })
        print("Account created")
        data = [ele for ele in self.users if ele["name"] == self.name]
        print(data)
        self.login()


name = input("Enter your name: ")
password = int(input("Enter password: "))

k = Ecart(name, password)
k.validation()




# class app:
#     databse =["jeevan","chintu"]

#     def __init__(self,name):
#         self.name =name

#     def login(self):
#         print("log in succesfull")
    
#     def dashboard(self):
#         print(f"this si {self.name}")

#     def validate(self):
#         if self.name in self.databse:
#             self.login()
#             self.dashboard()
#         else:
#             print("log in failed")
        

# obj =app("chintu")
# obj.validate()