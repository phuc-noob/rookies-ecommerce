import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../helpers/context/AuthContext";

export default function CustomerInfo() {
    const {authState: { user },
    } = useContext(AuthContext);
    return (
        <Card className="OrderItem" sx={{ border: 0.5, flexDirection: "column", borderColor: "#EBE7F3", display: "flex", marginTop: 0.5, justifyContent: 'flex-start' }}>
            
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginLeft:3,
                        marginTop:2,
                        marginBottom:2
                    }}
                >
                    <Box  sx={{width:150}}>
                        <strong >Customer Name  </strong>
                    </Box>
                    <Box
                        sx={{
                            flexDirection: "row",
                        }}
                    >
                        <strong >{user?user.firstName:"fisrt name"} {user?user.lastName:"last name"}  </strong>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginLeft:3,
                        marginBottom:2
                    }}
                >
                    <Box  sx={{width:150}}>
                        <strong >Address  </strong>
                    </Box>
                    <Box
                        sx={{
                            flexDirection: "row",
                        }}
                    >
                        <strong >{user?user.address:"no"}  </strong>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginLeft:3,
                        marginBottom:2
                    }}
                >
                    <Box  sx={{width:150}}>
                        <strong >Phone  </strong>
                    </Box>
                    <Box
                        sx={{
                            flexDirection: "row",
                        }}
                    >
                        <strong >{user?user.phone:"00000000"}  </strong>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginLeft:3,
                        marginBottom:2
                    }}
                >
                    <Box  sx={{width:150}}>
                        <strong >Gmail  </strong>
                    </Box>
                    <Box
                        sx={{
                            flexDirection: "row",
                        }}
                    >
                        <strong >{user?user.email:"email"}  </strong>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: 300,
                        display: "flex",
                        flexDirection: "column",
                        marginLeft:3,
                        marginBottom:1.5
                    }}
                >
                    <Button variant="outlined" sx={{
                    maxWidth: "400px",
                    width: 150,
                    height: 40,
                    color: "#16802C",
                    alignItems: "center",
                    borderColor: "#16802C",
                }}
                >
                    <strong>CHANGE INFO</strong>
                    </Button>
                </Box>
           
        </Card>
    )
}