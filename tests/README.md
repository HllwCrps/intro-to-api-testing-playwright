| #   | Name                                                                                            | Testing Data         |
| --- | ----------------------------------------------------------------------------------------------- | -------------------- |
| 1   | Successful calculation of risk with income greater than 0 returns 200                           | 1, 100, 1000, 100000 |
| 2   | Unsuccessful calculation of risk with income 0 returns 400                                      | 0                    |
| 3   | Unsuccessful calculation of risk with empty income returns 400                                  | NULL                 |
| 4   | Successful calculation of risk with positive debt returns 200                                   | 1, 100, 100000       |
| 5   | Unsuccessful calculation of risk with negative debt returns 400                                 | -1                   |
| 6   | Unsuccessful calculation of risk with age 16 or younger returns 200, but negative risk decision | 1, 4, 10             |
| 7   | Unsuccessful calculation of risk with negative age returns 400                                  | -1                   |
| 8   | Successful calculation of risk with employment status true returns 200                          | true                 |
