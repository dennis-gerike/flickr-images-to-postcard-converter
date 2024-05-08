@FP2PC-58
Feature: Adding margins
  As a user
  I want to be able to add margins to my photo(s)
  So I can compensate for my printer's inaccuracies

  @FP2PC-79
  Rule: Horizontal and vertical margins can be configured independently

  @FP2PC-84
  Scenario: The user should be able to configure the horizontal and vertical margin independently
    Given the user selected a Flickr photo
    When the user specifies no horizontal margin
    And the user specifies a vertical margin
    And the user starts the conversion process
    Then the final image should have no horizontal margin
    But the final image should have a vertical margin
