@FP2PC-28 @ignore
Feature: Processing a Flickr photo
  As a user
  I want to be able to convert one specific Flickr photo
  So I can quickly fill a gap in my collection

  @FP2PC-31
  Rule: When an invalid Flickr ID is provided then the conversion process should be aborted

  @FP2PC-33
  Scenario: When an invalid Flickr ID is provided then the conversion process should be aborted
    When the user selects an invalid Flickr photo
    And the user starts the conversion process
    Then the conversion process should have failed
