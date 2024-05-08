@FP2PC-58 @ignore
Feature: Adding margins
  As a user
  I want to be able to add margins to my photo(s)
  So I can compensate for my printer's inaccuracies

  @FP2PC-83
  Rule: The default margin size is 0

  @FP2PC-87
  Scenario: When no margins were specified then 0 should be assumed
    Given the user selected a Flickr photo
    When the user specifies no horizontal margin
    And the user specifies no vertical margin
    And the user starts the conversion process
    Then the final image should not have any margins
