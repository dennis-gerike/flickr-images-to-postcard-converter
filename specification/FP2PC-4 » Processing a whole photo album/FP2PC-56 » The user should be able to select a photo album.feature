@FP2PC-4
Feature: Processing a whole photo album
  As a user
  I want to be able to convert all photos of a specific Flickr album in one go
  So I don't have to convert each photo individually

  @FP2PC-55
  Rule: The user can select a photo album

  @FP2PC-56
  Scenario: The user should be able to select a photo album
    When the user selects a photo album
    And the user starts the conversion process
    Then all photos of the given album should have been processed
