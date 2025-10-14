# Gherkin Acceptance Criteria - La Mafia Game

## Authentication and User Management

```gherkin
Feature: User Registration and Authentication
  As a new user
  I want to register and authenticate using my Google account
  So that I can quickly access the application without creating additional credentials
  
  Background:
    Given the La Mafia Game application is running
    And the Google OAuth service is available

  Scenario: Successful registration with Google account
    Given I am a new user on the registration page
    When I click on "Register with Google"
    And I complete the Google authentication flow
    Then my account should be created in the system
    And I should be redirected to the main dashboard
    And I should see my Google profile information displayed

  Scenario: Successful login with existing Google account
    Given I am a registered user with a Google account
    And I am on the login page
    When I click on "Login with Google"
    And I complete the Google authentication flow
    Then I should be logged into the application
    And I should see my active games list
```

## Game Creation

```gherkin
Feature: Game Master creates a new game
  As a Game Master
  I want to create a new game with custom settings
  So that I can organize a game session with my friends with specific rules and categories
  
  Background:
    Given I am logged in as a Game Master
    And I am on the games list page

  Scenario: Create a new game with basic settings
    Given I click on "New Game" button
    When I enter a game password "SecurePass123"
    And I set the game duration to "24:00:00"
    And I click "Create Game"
    Then a new game should be created
    And the game should have a unique identifier
    And I should see the game in my games list

  Scenario: Add players to a newly created game
    Given I have created a new game
    And I am on the game setup page
    When I enter the username "Player1" in the add player field
    And I click "Add" button
    Then "Player1" should appear in the players list
    And the player count should show "(1)"

  Scenario: Remove a player from the game before starting
    Given I have created a new game
    And "Player1" is in the players list
    When I click the remove button next to "Player1"
    Then "Player1" should be removed from the players list
    And the player count should decrease by 1

  Scenario: Select challenge categories for the game
    Given I have created a new game
    And I am on the game setup page
    When I view the available categories
    Then I should see all free categories (Humor, Social, Digital, Misterio)
    And I should see all paid categories marked with a lock icon
    When I select "Humor" and "Social" categories
    And I click "Confirm Categories"
    Then the selected categories should be saved for this game
```

## Game Session Management

```gherkin
Feature: Player joins and manages game sessions
  As a player
  I want to join existing games and manage my game sessions
  So that I can participate in games created by others and keep track of my active games
  
  Background:
    Given I am logged in as a player
    And there is an active game with password "GamePass123"

  Scenario: Join an existing game with password
    Given I am on the games list page
    When I click "Join Game"
    And I enter the game password "GamePass123"
    And I click "Verify Password"
    Then I should be added to the game
    And I should see the game details page
    And I should receive a notification that I joined the game

  Scenario: Receive notification when added to a game
    Given a Game Master has created a new game
    When the Game Master adds me to the game
    Then I should receive a notification in the app
    And the notification should contain the game identifier
    And I should be able to access the game from the notification

  Scenario: View active games list
    Given I am participating in 2 active games
    When I navigate to my games list
    Then I should see 2 games displayed
    And each game should show its creation date and time
    And each game should show a unique identifier

  Scenario: Clean up finished games
    Given I have 3 finished games in my list
    When I click "Clean Up All Games"
    Then all finished games should be removed from my list
    And only active games should remain visible
```

## Mission and Target Assignment

```gherkin
Feature: Automatic assignment of targets and missions
  As the system
  I want to automatically assign targets and missions to each player
  So that the game dynamics are established without manual intervention
  
  Background:
    Given a game has been created with 5 players
    And the selected categories are "Humor" and "Social"
    And all players have joined the game

  Scenario: Assign unique targets to all players
    When the Game Master starts the game
    Then each player should be assigned exactly one target
    And no player should be assigned themselves as a target
    And no two players should have each other as mutual targets
    And all players should have a target assigned

  Scenario: Assign random missions from selected categories
    When the Game Master starts the game
    Then each player should receive one mission from the selected categories
    And the mission should be randomly selected
    And the mission should be appropriate for the player's target

  Scenario: Prevent circular mutual targeting
    Given Player A, Player B, and Player C are in the game
    When targets are assigned
    And Player A has Player B as target
    Then Player B should not have Player A as target
    And the assignment should create a valid chain
```

## Player Game View

```gherkin
Feature: Player views their game information
  As a player
  I want to view my target, mission, and mafia information
  So that I know what I need to accomplish and who is on my team
  
  Background:
    Given I am logged in as a player
    And I am participating in an active game
    And targets and missions have been assigned

  Scenario: View assigned target and mission
    When I open my game details page
    Then I should see my target's name
    And I should see my assigned mission description
    And I should see a "Regenerate Action" button

  Scenario: View current mafia information
    Given I am in an active game
    When I view my mafia information
    Then I should see "Mafia [MyUsername]" as my mafia name
    And I should see a member count of "1"
    And I should see only my own name in the members list

  Scenario: Other mafias remain private
    Given Player B has recruited 3 other players
    And I am not part of Player B's mafia
    When I view the game information
    Then I should not see Player B's mafia size
    And I should not see Player B's mafia members
    And I should only see my own mafia information
```

## Mission Reroll System

```gherkin
Feature: Player regenerates their assigned mission
  As a player
  I want to regenerate my mission by watching ads or purchasing rerolls
  So that I can get a different challenge if the current one doesn't suit me
  
  Background:
    Given I am logged in as a player
    And I am in an active game
    And I have been assigned a mission "Sing a song"

  Scenario: Reroll mission by watching advertisement
    Given I have not used any rerolls yet
    When I click "Regenerate Action" button
    And I watch a 30-second advertisement
    Then my mission should change to a different mission
    And the new mission should not be "Sing a song"
    And I should have 1 reroll remaining
    And my reroll count should show "1 attempt remaining"

  Scenario: Use second free reroll
    Given I have used 1 reroll already
    When I click "Regenerate Action" button
    And I watch a 30-second advertisement
    Then my mission should change again
    And I should have 0 rerolls remaining
    And I should see an option to purchase more rerolls

  Scenario: Purchase additional rerolls during game
    Given I have used all free rerolls
    When I click "Regenerate Action" button
    Then I should see a purchase option
    When I click "Buy 1 Reroll for €0.50"
    And I complete the payment
    Then I should have 1 additional reroll available
    And I should be able to regenerate my mission

  Scenario: Previously rolled missions do not reappear
    Given I have rerolled from mission "Sing a song" to mission "Dance"
    When I reroll again
    Then the new mission should not be "Sing a song"
    And the new mission should not be "Dance"
```

## Recruitment and Verification

```gherkin
Feature: Player completes mission and recruits target
  As a player
  I want to mark my mission as completed and have my target verify it
  So that I can recruit them to my mafia and grow my team
  
  Background:
    Given Player A has Player B as target
    And Player A's mission is "Get target to sing a song"
    And both players are in an active game

  Scenario: Player marks mission as completed
    Given Player B has sung a song
    When Player A clicks "Mission Completed" button
    Then Player B should receive a verification notification
    And the system should wait for Player B's confirmation
    And Player A should see "Waiting for verification" status

  Scenario: Target verifies successful recruitment
    Given Player A has marked their mission as completed
    When Player B opens the verification notification
    Then Player B should see Player A's mission description
    And Player B should see options "Confirm" and "Deny"
    When Player B clicks "Confirm"
    Then Player B should join Player A's mafia
    And Player A should see Player B in their mafia members
    And the mafia count should increase to 2

  Scenario: Target denies recruitment attempt
    Given Player A has marked their mission as completed
    When Player B receives the verification request
    And Player B clicks "Deny"
    Then Player B should not join Player A's mafia
    And Player A should receive a notification that verification was denied
    And Player A should remain with their original mission

  Scenario: Recruited player inherits original mission
    Given Player B has been recruited by Player A
    When Player B views their game information
    Then Player B should see the same target as Player A
    And Player B should see the same mission as Player A
    And Player B should see "Mafia Player A" as their mafia name
```

## Mafia Dynamics and Growth

```gherkin
Feature: Mafia expansion and absorption mechanics
  As a player
  I want my mafia to grow when recruiting others and potentially absorb entire groups
  So that I can build the largest mafia and win the game
  
  Background:
    Given there is an active game with Players A, B, C, D, and E
    And each player starts with their own individual mafia

  Scenario: Player starts with individual mafia
    Given the game has just started
    When Player A views their mafia information
    Then the mafia name should be "Mafia Player A"
    And the member count should be 1
    And only Player A should be listed as a member

  Scenario: Recruit a single player
    Given Player A has Player B as target
    When Player A successfully recruits Player B
    Then Player B should leave "Mafia Player B"
    And Player B should join "Mafia Player A"
    And "Mafia Player A" should have 2 members
    And both Player A and Player B should share the same mission

  Scenario: Absorb entire mafia when recruiting a leader
    Given Player A has recruited Player B and Player C
    And "Mafia Player A" has 3 members
    And Player D has Player A as target
    When Player D successfully recruits Player A
    Then all members of "Mafia Player A" should join "Mafia Player D"
    And "Mafia Player D" should have 4 members (D, A, B, C)
    And "Mafia Player A" should no longer exist
    And all former members should see "Mafia Player D" as their mafia

  Scenario: Continue being vulnerable after recruiting
    Given Player A has recruited 5 players
    And Player A is still someone's target
    When Player A's hunter successfully recruits Player A
    Then Player A's entire mafia of 6 players should be absorbed
    And Player A should not be immune from recruitment
```

## Game Completion and Victory

```gherkin
Feature: Game finishes and declares winner
  As the system
  I want to determine and announce the winner when the game ends
  So that players know who won and can see the final results
  
  Background:
    Given a game was created with 10 players
    And the game duration was set to "02:00:00"

  Scenario: Game ends when time expires
    Given the game has been running for 1 hour and 59 minutes
    When the time reaches 2 hours
    Then the game should automatically end
    And the system should calculate the largest mafia
    And the winner should be announced

  Scenario: Largest mafia wins when time expires
    Given the game time has expired
    And "Mafia Player A" has 6 members
    And "Mafia Player B" has 3 members
    And "Mafia Player C" has 1 member
    When the system determines the winner
    Then Player A should be declared the winner
    And all players should see "Player A wins with 6 members"

  Scenario: Player wins by recruiting everyone before time expires
    Given Player A has recruited all other 9 players
    And there is still 30 minutes remaining
    When the last player is recruited
    Then the game should end immediately
    And Player A should be declared the winner
    And all players should see "Player A wins by total domination"

  Scenario: View final game results
    Given the game has ended
    When I view the game results page
    Then I should see all mafias that existed at the end
    And I should see each mafia's final member count
    And I should see the winner highlighted
    And I should see my final position in the game
```

## Challenge Categories Management

```gherkin
Feature: System manages challenge categories and content
  As the system
  I want to organize challenges into categories and assign them randomly
  So that games have variety and appropriate content based on Game Master selection
  
  Background:
    Given the system has a database of challenges
    And challenges are organized into categories

  Scenario: Display free categories
    Given I am a Game Master creating a game
    When I view available categories
    Then I should see "Humor" as a free category
    And I should see "Social" as a free category
    And I should see "Digital" as a free category
    And I should see "Misterio" as a free category
    And none of these should have a lock icon

  Scenario: Display paid categories with lock indicators
    Given I am viewing available categories
    When I look at paid categories
    Then I should see "Despedida de soltero" with a lock icon
    And I should see "Copas" with a lock icon
    And I should see "Creatividad" with a lock icon
    And I should see "Seducción/Coqueteo" with a lock icon
    And I should see "Ejercicio" with a lock icon
    And each should display a teasing message

  Scenario: Randomly assign challenges from selected categories
    Given a game has selected "Humor" and "Social" categories
    And there are 5 players in the game
    When the game starts
    Then each player should receive a challenge
    And all challenges should be from either "Humor" or "Social"
    And challenges should be randomly distributed
```

## User-Generated Content

```gherkin
Feature: Users create and submit custom challenges
  As a user
  I want to create my own challenges and submit them for validation
  So that I can contribute to the game's content and see my challenges used by others
  
  Background:
    Given I am logged in as a user
    And I am on my profile page

  Scenario: Create a new custom challenge
    When I click "Create Challenge"
    And I select "Humor" as the category
    And I enter "Make your target tell a dad joke" as the challenge text
    And I click "Submit for Review"
    Then the challenge should be saved as "Pending Validation"
    And I should see a confirmation message
    And an administrator should receive a notification to review

  Scenario: Propose a new challenge category
    When I click "Propose New Category"
    And I enter "Sports" as the category name
    And I enter "Challenges related to sports activities" as description
    And I click "Submit Proposal"
    Then the category proposal should be saved
    And it should be marked for administrator review

  Scenario: Administrator validates user-submitted challenge
    Given a user has submitted a challenge for review
    When an administrator reviews the challenge
    And the administrator clicks "Approve"
    Then the challenge should be added to the active challenges database
    And the challenge should be available for future games
    And the user should receive a notification of approval
```

## Monetization - Advertisement System

```gherkin
Feature: Display advertisements to free users
  As the system
  I want to show advertisements at strategic points
  So that the app can generate revenue while remaining free for users
  
  Background:
    Given I am logged in as a free user
    And I have not purchased ad removal

  Scenario: Display ad when rerolling mission
    Given I am viewing my mission
    When I click "Regenerate Action"
    Then a 30-second advertisement should be displayed
    And I should not be able to skip before 30 seconds
    When the ad completes
    Then I should receive a new mission
    And my reroll count should decrease

  Scenario: Display ad when entering the application
    Given I have closed the application
    When I open the application again
    Then a brief advertisement should be displayed
    And I should see a "Continue" button after 5 seconds

  Scenario: Premium user does not see ads
    Given I have purchased ad removal
    When I click "Regenerate Action"
    Then no advertisement should be displayed
    And I should immediately receive a new mission
```

## Monetization - In-App Purchases

```gherkin
Feature: Purchase premium features and content
  As a user
  I want to purchase various premium features
  So that I can enhance my gaming experience and access exclusive content
  
  Background:
    Given I am logged in as a user
    And I am on the shop page

  Scenario: Purchase permanent ad removal
    Given I am viewing the shop
    When I select "Remove Ads - €4.99"
    And I complete the payment
    Then ads should be permanently disabled for my account
    And I should have 2 permanent rerolls per game
    And I should see a "Premium" badge on my profile

  Scenario: Purchase individual reroll
    Given I have used all free rerolls in a game
    When I click "Buy 1 Reroll - €0.50"
    And I complete the payment
    Then I should have 1 additional reroll available immediately
    And the reroll should be usable in the current game

  Scenario: Purchase reroll pack
    Given I am viewing reroll purchase options
    When I select "5 Rerolls Pack - €2.00"
    And I complete the payment
    Then I should have 5 rerolls added to my account
    And the rerolls should be usable across multiple games

  Scenario: Purchase individual challenge category
    Given "Seducción/Coqueteo" category is locked
    When I click on the locked category
    And I select "Unlock for €5.99"
    And I complete the payment
    Then "Seducción/Coqueteo" should be unlocked permanently
    And I should be able to use it when creating games
    And the lock icon should be removed

  Scenario: Purchase all categories bundle
    Given there are 5 paid categories totaling €29.95
    When I select "All Categories Pack - €20.00"
    And I complete the payment
    Then all paid categories should be unlocked
    And I should save €9.95 compared to individual purchases
```

## Game Master Interface

```gherkin
Feature: Game Master views and manages game information
  As a Game Master
  I want to view comprehensive game information and player details
  So that I can monitor the game progress and assist players if needed
  
  Background:
    Given I am logged in as a Game Master
    And I have created a game with 6 players

  Scenario: View complete players list
    When I open the game details page
    Then I should see all 6 players listed
    And each player should show their username
    And each player should have a "Copy Link" button
    And each player should have a "View Profile" button

  Scenario: Copy player profile link
    Given I am viewing the players list
    When I click "Copy Link" next to Player B
    Then Player B's profile URL should be copied to clipboard
    And I should see a "Link copied" confirmation message

  Scenario: Access player profiles
    Given I am viewing the players list
    When I click "View Player Profile" for Player C
    Then I should be redirected to Player C's profile page
    And I should see Player C's basic information
```

## Feedback System

```gherkin
Feature: Users submit feedback and suggestions
  As a user
  I want to send feedback about the application
  So that I can help improve the game and share my experience with the developers
  
  Background:
    Given I am logged in as a user

  Scenario: Submit general feedback from app
    Given I am on any page in the application
    When I click the "Feedback" button in the menu
    And I enter "Great game! Would love more categories" in the feedback form
    And I click "Send Feedback"
    Then my feedback should be submitted
    And an email should be sent to the administrators
    And I should see a "Thank you for your feedback" message

  Scenario: Submit category-specific feedback
    Given I am viewing the "Humor" category
    When I click "Send Feedback about this category"
    And I enter "Some challenges are too easy" in the feedback form
    And I click "Send"
    Then the feedback should be tagged with "Humor" category
    And administrators should receive the feedback via email with category tag
```

## Language Configuration

```gherkin
Feature: User selects application language
  As a user
  I want to change the application language between Spanish and English
  So that I can use the app in my preferred language
  
  Background:
    Given I am logged in as a user
    And the application is currently in Spanish

  Scenario: Change language to English
    Given I am on the settings page
    When I select "English" from the language dropdown
    And I click "Save Preferences"
    Then all interface text should change to English
    And all challenges should be displayed in English
    And my language preference should be saved

  Scenario: New user default language
    Given I am a new user registering for the first time
    When I complete the Google authentication
    Then the system should detect my Google account language
    And the application should be displayed in that language
    And I should be able to change it in settings
```