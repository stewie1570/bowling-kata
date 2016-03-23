#bowling-kata
[![Build](https://api.travis-ci.org/stewie1570/bowling-kata.svg)](https://travis-ci.org/stewie1570/bowling-kata)

This Kata includes usage of [javascript-ioc](https://github.com/stewie1570/Javascript-IOC).

Usage:

	node .\dist\app.js "7,0|10|0,10|10|10|1,8|0,9|10|8,2|0,10,10"

Output:

	------------------------------------------------------------------------------------- 
	| 7 | - |   | X | - | / |   | X |   | X | 1 | 8 | - | 9 |   | X | 8 | / | - | / | X | 
	|   ----|   ----|   ----|   ----|   ----|   ----|   ----|   ----|   ----|   --------| 
	|     7 |    27 |    47 |    68 |    87 |    96 |   105 |   125 |   135 |       155 | 
	------------------------------------------------------------------------------------- 
	And here is the dependency graph...just because :)                                    
	{                                                                                     
			"name": "BowlingGameController()",                                            
			"dependencies": [                                                             
					{                                                                     
							"name": "view",                                               
							"dependencies": []                                            
					},                                                                    
					{                                                                     
							"name": "gameProvider",                                       
							"dependencies": [                                             
									{                                                     
											"name": "userInput",                          
											"dependencies": []                            
									},                                                    
									{                                                     
											"name": "parser",                             
											"dependencies": []                            
									},                                                    
									{                                                     
											"name": "scorer",                             
											"dependencies": []                            
									}                                                     
							]                                                             
					}                                                                     
			]                                                                             
	}                                                                                     