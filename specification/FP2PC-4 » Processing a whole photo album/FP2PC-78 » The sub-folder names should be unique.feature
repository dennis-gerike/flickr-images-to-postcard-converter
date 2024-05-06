@FP2PC-4
Feature: Processing a whole photo album
  As a user
  I want to be able to convert all photos of a specific Flickr album in one go
  So I don't have to convert each photo individually

  @FP2PC-73
  Rule: The processed album photos are collected in a dedicated sub-folder

  @FP2PC-78
  Scenario: The sub-folder names should be unique
    When the user selects a photo album A
    And the user starts the conversion process
    When the user selects a photo album B
    And the user starts the conversion process
    Then the processed images of album A and B should be in different folders
