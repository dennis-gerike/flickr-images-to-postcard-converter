@FP2PC-58 @ignore
Feature: Adding margins
  As a user
  I want to be able to add margins to my photo(s)
  So I can compensate for my printer's inaccuracies

  @FP2PC-80
  Rule: The valid range of values is between 0 and 100 percent

  @FP2PC-85
  Scenario: The user should not be able to configure a margin below 0 percent
    Given the user selected a Flickr photo
    When the user specifies a horizontal margin of 5 percent
    And the user specifies a vertical margin of -10 percent
    And the user starts the conversion process
    Then the conversion process should have failed
