@FP2PC-59
Feature: Adding a buffer between photo and caption
  As a user
  I want to be able to control the distance between photo and caption
  So the final image looks better

  @FP2PC-61
  Rule: Only buffer sizes between 0 and 100 percent are allowed

  @FP2PC-68
  Scenario: Negative buffer sizes are not allowed
    Given the user selected a Flickr photo
    And the user specified a caption
    When the user specifies a buffer of -1 percent
    And the user starts the conversion process
    Then the conversion process should have failed
