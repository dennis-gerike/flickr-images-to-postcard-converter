@FP2PC-58
Feature: Adding margins
  As a user
  I want to be able to add margins to my photo(s)
  So I can compensate for my printer's inaccuracies

  @FP2PC-80
  Rule: The valid range of values is between 0 and 100 percent

  @FP2PC-86
  Scenario: The user should not be able to configure a margin above 100 percent
    Given the user selected a Flickr photo
    When the user specifies a horizontal margin of 101 percent
    And the user specifies a vertical margin of 7 percent
    And the user starts the conversion process
    Then the conversion process should have failed
