@FP2PC-4 @ignore
Feature: Processing a whole photo album
  As a user
  I want to be able to convert all photos of a specific Flickr album in one go
  So I don't have to convert each photo individually

  @FP2PC-74
  Rule: Invalid album IDs cancel the processing

  @FP2PC-75
  Scenario: Invalid album IDs should cancel the processing
    When the user selects an invalid photo album
    And the user starts the conversion process
    Then the conversion process should have failed
